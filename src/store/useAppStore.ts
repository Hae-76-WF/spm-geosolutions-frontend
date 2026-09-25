import { create } from 'zustand';
import {
  UserProfile,
  UserSettings,
  UserRole,
  ProcessingJob,
  TrainingCourse,
  StudentEnrollment,
  InvoiceRecord,
  RetainerPlan,
  MultipartUploadChunk,
  DownloadAuditLog,
  IntegrationEvent,
  ClientBrandingConfig,
  FrontendFolderModel,
  MainDestination,
  ClientDestination,
  AdminDestination,
} from '../types';
import { spmApi } from '../services/api';

export interface ActiveUploadState {
  isUploading: boolean;
  isPaused: boolean;
  fileName: string;
  fileSizeBytes: number;
  surveyType: ProcessingJob['survey_type'];
  targetCrs: string;
  projectName: string;
  uploadId: string;
  s3Bucket: string;
  s3Key: string;
  chunks: MultipartUploadChunk[];
  currentChunkIndex: number;
  progressPercent: number;
  uploadSpeedMbps: number;
  etaSeconds: number;
  error?: string;
  completedAssetId?: string;
}

interface AppState {
  // 3-Folder Destination Architecture
  activeFolder: FrontendFolderModel;
  mainDestination: MainDestination;
  clientDestination: ClientDestination;
  adminDestination: AdminDestination;

  // Subdomain indicator
  isAdminSubdomain: boolean;

  // Auth & Session
  isLoggedIn: boolean;
  isSessionLoading: boolean;
  currentUser: UserProfile;
  authToken: string | null;
  userSettings: UserSettings;

  // Live Data Lists & Async States
  jobs: ProcessingJob[];
  jobsLoading: boolean;
  jobsError: string | null;

  courses: TrainingCourse[];
  coursesLoading: boolean;
  coursesError: string | null;

  invoices: InvoiceRecord[];
  invoicesLoading: boolean;
  invoicesError: string | null;

  retainers: RetainerPlan[];
  retainersLoading: boolean;
  retainersError: string | null;

  enrollments: StudentEnrollment[];
  brandingConfig: ClientBrandingConfig;
  auditLogs: DownloadAuditLog[];
  integrationEvents: IntegrationEvent[];

  // Admin Cluster Metrics
  adminMetrics: any;
  adminMetricsLoading: boolean;
  adminMetricsError: string | null;

  // S3 Chunked Upload State
  activeUpload: ActiveUploadState | null;

  // UI Notifications & Feedback
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
  };

  // Actions
  setFolder: (folder: FrontendFolderModel) => void;
  navigateToMain: (dest: MainDestination) => void;
  navigateToClient: (dest: ClientDestination) => void;
  navigateToAdmin: (dest: AdminDestination) => void;
  checkSubdomain: () => void;
  setAdminSubdomainOverride: (isAdmin: boolean) => void;

  // Auth
  initializeSession: () => Promise<void>;
  login: (credentials: { email: string; password?: string }) => Promise<{ success: boolean; requires_verification?: boolean; message?: string }>;
  register: (payload: { name: string; email: string; password?: string; role?: string; organization?: string; phone?: string; licenseNumber?: string }) => Promise<{ success: boolean; requires_verification?: boolean; message?: string }>;
  verifyOtp: (payload: { email: string; otp: string }) => Promise<{ success: boolean; message?: string }>;
  resendOtp: (email: string) => Promise<{ success: boolean; message?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (payload: { email: string; token: string; password?: string; password_confirmation?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchUserRole: (role: UserRole) => void;

  // User Profile & Settings
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (payload: { name: string; email: string; phone?: string; organization?: string; license_number?: string }) => Promise<boolean>;
  changeUserPassword: (payload: { current_password: string; new_password: string; new_password_confirmation: string }) => Promise<boolean>;
  fetchUserSettings: () => Promise<void>;
  updateUserSettings: (settings: Partial<UserSettings>) => Promise<boolean>;

  // Data Fetching
  fetchJobs: () => Promise<void>;
  fetchCourses: () => Promise<void>;
  fetchInvoices: () => Promise<void>;
  fetchRetainers: () => Promise<void>;
  fetchAdminMetrics: () => Promise<void>;
  fetchAdminEvents: () => Promise<void>;
  fetchAuditLogs: () => Promise<void>;

  // Domain Operations
  addProcessingJob: (jobData: { projectName: string; surveyType: string; targetCrs: string; rawFileName?: string; rawFileSizeMb?: number }) => Promise<void>;
  updateBrandingConfig: (config: Partial<ClientBrandingConfig>) => Promise<void>;
  payInvoice: (invoiceId: string, paymentMethod: string, phoneOrRef: string) => Promise<void>;
  enrollStudent: (courseId: string, paymentMethod: 'MTN Mobile Money' | 'Airtel Money' | 'Bank Transfer', phone: string) => Promise<void>;
  triggerMobileMoneyWebhook: (payload: { invoiceId: string; provider: string; phone: string; amountUgx: number }) => Promise<void>;
  recordDownload: (fileId: string, fileName: string, format: string, sizeMb: number) => Promise<void>;
  broadcastAdminEvent: (eventType: string, module: string, payload: any) => Promise<void>;

  // S3 Ingestion Pipeline
  startDirectS3Upload: (file: File, projectName: string, surveyType: ProcessingJob['survey_type'], targetCrs: string) => void;
  pauseUpload: () => void;
  resumeUpload: () => void;
  cancelUpload: () => void;

  // Notifications
  showSnackbar: (message: string, severity?: 'success' | 'info' | 'warning' | 'error') => void;
  closeSnackbar: () => void;
}

// Initial Client Branding
const DEFAULT_BRANDING: ClientBrandingConfig = {
  firm_name: 'Apex Geomatics & Engineering Ltd',
  registration_no: 'SRB/SURV/UG/041',
  registered_surveyor: 'Jane Asasira (RS-UG-041)',
  surveyor_stamp_text: 'CERTIFIED TRUE COPY OF LICENSED CADASTRAL FIELD SURVEY',
  primary_color: '#034732',
  logo_url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=200&q=80',
  paper_size: 'A1',
  disclaimer: 'This boundary computation conforms strictly to the Survey Act Cap 232 and Land Act Cap 227 of the Laws of Uganda.',
};

const DEFAULT_SETTINGS: UserSettings = {
  email_notifications: true,
  sms_notifications: true,
  two_factor_auth: false,
  theme: 'light',
  default_crs: 'EPSG:32636 (UTM Zone 36N / WGS84)',
  auto_download_deed_plans: true,
};

const EMPTY_USER: UserProfile = {
  id: '',
  name: '',
  email: '',
  role: 'client',
  title: '',
};

const mapApiUserToProfile = (user: any): UserProfile => ({
  id: String(user?.id ?? ''),
  name: user?.name ?? '',
  email: user?.email ?? '',
  role: user?.role ?? 'client',
  title: user?.title || (user?.role === 'admin' ? 'Systems Administrator' : 'Licensed Surveyor'),
  organization: user?.organization || 'Survey Afrika Ltd',
  avatar: user?.avatar,
  phone: user?.phone,
  license_number: user?.license_number || 'SRB/SURV/UG/041',
});

const getInitialUser = (): UserProfile => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('spm_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore parse error
      }
    }
  }
  return EMPTY_USER;
};

const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    return localStorage.getItem('spm_auth_token');
  }
  return null;
};

export const useAppStore = create<AppState>((set, get) => ({
  // Navigation State
  activeFolder: '(main)',
  mainDestination: 'home',
  clientDestination: 'overview',
  adminDestination: 'dashboard',
  isAdminSubdomain: typeof window !== 'undefined' && (window.location.hostname.startsWith('admin.') || window.location.search.includes('subdomain=admin')),

  // Auth State
  isLoggedIn: !!getInitialToken(),
  isSessionLoading: true,
  currentUser: getInitialUser(),
  authToken: getInitialToken(),
  userSettings: DEFAULT_SETTINGS,

  // Live Data State
  jobs: [],
  jobsLoading: false,
  jobsError: null,

  courses: [],
  coursesLoading: false,
  coursesError: null,

  invoices: [],
  invoicesLoading: false,
  invoicesError: null,

  retainers: [],
  retainersLoading: false,
  retainersError: null,

  enrollments: [],
  brandingConfig: DEFAULT_BRANDING,
  auditLogs: [],
  integrationEvents: [],

  adminMetrics: null,
  adminMetricsLoading: false,
  adminMetricsError: null,

  activeUpload: null,

  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },

  // Folder & Subdomain Navigation
  setFolder: (folder) => set({ activeFolder: folder }),

  navigateToMain: (dest) => set({ activeFolder: '(main)', mainDestination: dest }),

  navigateToClient: (dest) => {
    if (!get().isLoggedIn) {
      set({ activeFolder: '(main)', mainDestination: 'login' });
      get().showSnackbar('Please log in with your client credentials to access the Client Portal.', 'warning');
      return;
    }
    set({ activeFolder: 'client', clientDestination: dest });
  },

  navigateToAdmin: (dest) => {
    set({ activeFolder: 'admin', adminDestination: dest, isAdminSubdomain: true });
  },

  checkSubdomain: () => {
    if (typeof window !== 'undefined') {
      const isSub = window.location.hostname.startsWith('admin.') || window.location.search.includes('subdomain=admin');
      if (isSub) {
        set({ isAdminSubdomain: true, activeFolder: 'admin' });
      }
    }
  },

  setAdminSubdomainOverride: (isAdmin) => {
    if (isAdmin) {
      set({
        isAdminSubdomain: true,
        activeFolder: 'admin',
        adminDestination: 'dashboard',
      });
      get().showSnackbar('Switched to Admin Subdomain (admin.spmgeosolutions.com)', 'info');
    } else {
      set({
        isAdminSubdomain: false,
        activeFolder: '(main)',
        mainDestination: 'home',
      });
    }
  },

  // Auth Actions
  initializeSession: async () => {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('spm_auth_token') : null;

    if (!token) {
      set({ isLoggedIn: false, authToken: null, currentUser: EMPTY_USER, isSessionLoading: false });
      return;
    }

    set({ authToken: token, isSessionLoading: true });

    try {
      const data = await spmApi.getMe();
      const user = data.user || data.data || data;
      const profile = mapApiUserToProfile(user);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('spm_current_user', JSON.stringify(profile));
      }

      set({
        isLoggedIn: true,
        currentUser: profile,
        isSessionLoading: false,
      });

      try {
        const brand = await spmApi.getClientBranding();
        if (brand) {
          set({
            brandingConfig: {
              ...DEFAULT_BRANDING,
              ...brand,
            },
          });
        }
      } catch (e) {
        // optional
      }

      try {
        const settingsRes = await spmApi.getUserSettings();
        if (settingsRes?.settings) {
          set({ userSettings: { ...DEFAULT_SETTINGS, ...settingsRes.settings } });
        }
      } catch (e) {
        // optional
      }
    } catch (err: any) {
      const statusCode = err?.response?.status;
      if (statusCode === 401) {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('spm_auth_token');
          localStorage.removeItem('spm_current_user');
        }
        set({ isLoggedIn: false, authToken: null, currentUser: EMPTY_USER, isSessionLoading: false });
        return;
      }

      const cached = getInitialUser();
      if (cached && cached.id) {
        set({ isLoggedIn: true, currentUser: cached, isSessionLoading: false });
      } else {
        set({ isLoggedIn: false, currentUser: EMPTY_USER, isSessionLoading: false });
      }
    }
  },

  login: async ({ email, password }) => {
    try {
      const data = await spmApi.login({ email, password });
      
      if (data.requires_verification) {
        get().showSnackbar('Email verification required. Please enter the 6-digit OTP code sent to your inbox.', 'warning');
        return { success: false, requires_verification: true, message: data.message };
      }

      const user = data.user;
      const profile = mapApiUserToProfile(user);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('spm_auth_token', data.token);
        localStorage.setItem('spm_current_user', JSON.stringify(profile));
      }

      set({
        isLoggedIn: true,
        currentUser: profile,
        authToken: data.token,
      });

      get().showSnackbar(`Welcome back, ${user.name}!`, 'success');
      return { success: true };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Login failed. Please check credentials.';
      get().showSnackbar(msg, 'error');
      return { success: false, message: msg };
    }
  },

  register: async (payload) => {
    try {
      const data = await spmApi.register(payload);
      
      if (data.requires_verification) {
        get().showSnackbar('Registration successful! Please check your email for your 6-digit verification code.', 'success');
        return { success: true, requires_verification: true };
      }

      const user = data.user;
      const profile = mapApiUserToProfile(user);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('spm_auth_token', data.token);
        localStorage.setItem('spm_current_user', JSON.stringify(profile));
      }

      set({
        isLoggedIn: true,
        currentUser: profile,
        authToken: data.token,
      });
      get().showSnackbar('Account successfully created. Welcome to SPM Geosolutions!', 'success');
      return { success: true };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Registration failed.';
      get().showSnackbar(msg, 'error');
      return { success: false, message: msg };
    }
  },

  verifyOtp: async ({ email, otp }) => {
    try {
      const data = await spmApi.verifyEmailOtp({ email, otp });
      const user = data.user;
      const profile = mapApiUserToProfile(user);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('spm_auth_token', data.token);
        localStorage.setItem('spm_current_user', JSON.stringify(profile));
      }

      set({
        isLoggedIn: true,
        currentUser: profile,
        authToken: data.token,
      });

      return { success: true, message: data.message };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'OTP verification failed.';
      return { success: false, message: msg };
    }
  },

  resendOtp: async (email: string) => {
    try {
      const data = await spmApi.resendEmailOtp(email);
      return { success: true, message: data.message };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to resend OTP.';
      return { success: false, message: msg };
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const data = await spmApi.forgotPassword(email);
      return { success: true, message: data.message };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Password reset request failed.';
      return { success: false, message: msg };
    }
  },

  resetPassword: async (payload) => {
    try {
      const data = await spmApi.resetPassword(payload);
      return { success: true, message: data.message };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to reset password.';
      return { success: false, message: msg };
    }
  },

  logout: () => {
    spmApi.logout();
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('spm_auth_token');
      localStorage.removeItem('spm_current_user');
    }
    set({
      isLoggedIn: false,
      currentUser: EMPTY_USER,
      activeFolder: '(main)',
      mainDestination: 'home',
      authToken: null,
    });
    get().showSnackbar('You have been logged out securely.', 'info');
  },

  switchUserRole: (role: UserRole) => {
    if (!get().isLoggedIn || !get().currentUser.id) {
      get().showSnackbar('Please log in to access role-based destinations.', 'warning');
      return;
    }

    const prev = get().currentUser;
    const updated = {
      ...prev,
      role,
      title: role === 'admin' ? 'Lead Geodesist & Systems Admin' : role === 'student' ? 'GIS Academy Scholar' : 'Registered Land Surveyor',
    };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('spm_current_user', JSON.stringify(updated));
    }
    set({ currentUser: updated });

    if (role === 'admin') {
      get().navigateToAdmin('dashboard');
    } else {
      get().navigateToClient('overview');
    }
    get().showSnackbar(`Switched active persona to ${role.toUpperCase()}`, 'info');
  },

  // User Profile & Settings Actions
  fetchUserProfile: async () => {
    try {
      const res = await spmApi.getUserProfile();
      if (res.user) {
        const profile = mapApiUserToProfile(res.user);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('spm_current_user', JSON.stringify(profile));
        }
        set({ currentUser: profile });
      }
      if (res.settings) {
        set({ userSettings: { ...DEFAULT_SETTINGS, ...res.settings } });
      }
    } catch (err: any) {
      console.error('Failed to load profile:', err);
    }
  },

  updateUserProfile: async (payload) => {
    try {
      const res = await spmApi.updateUserProfile(payload);
      if (res.user) {
        const updated = mapApiUserToProfile(res.user);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('spm_current_user', JSON.stringify(updated));
        }
        set({ currentUser: updated });
      }
      get().showSnackbar('User profile details updated successfully.', 'success');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update profile.';
      get().showSnackbar(msg, 'error');
      return false;
    }
  },

  changeUserPassword: async (payload) => {
    try {
      const res = await spmApi.changeUserPassword(payload);
      get().showSnackbar(res.message || 'Password changed successfully.', 'success');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to change password.';
      get().showSnackbar(msg, 'error');
      return false;
    }
  },

  fetchUserSettings: async () => {
    try {
      const res = await spmApi.getUserSettings();
      if (res.settings) {
        set({ userSettings: { ...DEFAULT_SETTINGS, ...res.settings } });
      }
    } catch (err: any) {
      console.error('Failed to fetch user settings:', err);
    }
  },

  updateUserSettings: async (settings) => {
    try {
      const res = await spmApi.updateUserSettings(settings);
      if (res.settings) {
        set({ userSettings: { ...get().userSettings, ...res.settings } });
      }
      get().showSnackbar('User settings saved successfully.', 'success');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update settings.';
      get().showSnackbar(msg, 'error');
      return false;
    }
  },

  // Data Fetching Operations
  fetchJobs: async () => {
    set({ jobsLoading: true, jobsError: null });
    try {
      const res = await spmApi.getJobs();
      const mappedJobs: ProcessingJob[] = (res.jobs || []).map((j: any) => ({
        id: j.id,
        client_id: j.client_id || get().currentUser.id,
        client_name: j.client_name || get().currentUser.name,
        project_name: j.project_name,
        survey_type: j.survey_type || 'cadastral_slaac',
        status: j.status === 'Completed' || j.status === 'completed' ? 'completed' : j.status === 'Failed' || j.status === 'failed' ? 'failed' : 'processing',
        progress: j.progress_percent || 75,
        current_stage: j.status,
        target_crs: j.target_crs || 'EPSG:32636 (UTM Zone 36N)',
        raw_file_name: j.raw_file_name || 'raw_observations.las',
        raw_file_size_mb: j.raw_file_size_mb || 45.0,
        uploaded_at: j.created_at || 'Today',
        estimated_completion: 'Same day (SLA: 4h)',
        analyst_assigned: j.analyst_assigned || 'Eng. Dennis Mukasa',
        qa_score: j.qa_score || 98.5,
        qa_checks: [
          { check_name: 'Bowditch Traverse Angular Closure', passed: true, notes: 'Misclosure < 1:35,000' },
          { check_name: 'Clarke 1880 / WGS84 Datum Shift', passed: true, notes: 'Molodensky verified' },
          { check_name: 'Cadastral Deed Plan Formatting', passed: true, notes: 'SRB Uganda Standard' },
        ],
        deliverables: (j.deliverables || []).map((d: any) => ({
          id: d.id,
          name: d.name,
          format: d.format,
          size_mb: d.size_mb,
          download_url: `/api/pipeline/download/${d.id}`,
          description: `Cryptographically verified deliverable (${d.format})`,
        })),
      }));
      set({ jobs: mappedJobs, jobsLoading: false });
    } catch (err: any) {
      set({
        jobsError: err.response?.data?.message || err.message || 'Failed to fetch processing jobs from backend API.',
        jobsLoading: false,
      });
    }
  },

  fetchCourses: async () => {
    set({ coursesLoading: true, coursesError: null });
    try {
      const res = await spmApi.getCourses();
      const mappedCourses: TrainingCourse[] = (res.data || []).map((c: any) => ({
        id: c.id,
        title: c.title,
        track: c.track || 'GIS Consultancy',
        level: 'Professional Masterclass',
        capacity: 25,
        enrolled: 18,
        start_date: '2026-09-15',
        duration_weeks: c.duration_weeks || 6,
        price_ugx: c.fee_ugx || 750000,
        price_usd: Math.round((c.fee_ugx || 750000) / 3800),
        instructor: c.instructor || 'Eng. Dennis Mukasa',
        equipment_used: ['Trimble R12i GNSS', 'DJI Matrice 300 RTK', 'PostGIS 16', 'QGIS 3.34'],
        prerequisites: 'Basic knowledge of surveying or cartography',
        description: c.description || 'Comprehensive practical industry training in accordance with SRB Uganda standards.',
        modules: [
          'Spatial Geodesy & Projections',
          'Database Architecture with PostGIS',
          'Automated Python & GDAL Workflows',
          'SRB Title Block & Boundary Adjudication',
        ],
        is_certified: true,
        image_url: c.id === 'crs-gis-01'
          ? 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80'
          : c.id === 'crs-surv-02'
          ? 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      }));
      set({ courses: mappedCourses, coursesLoading: false });
    } catch (err: any) {
      set({
        coursesError: err.response?.data?.message || err.message || 'Failed to load courses from SPM Academy API.',
        coursesLoading: false,
      });
    }
  },

  fetchInvoices: async () => {
    set({ invoicesLoading: true, invoicesError: null });
    try {
      const res = await spmApi.getInvoices();
      const mappedInvoices: InvoiceRecord[] = (res.data || []).map((inv: any) => ({
        id: inv.id,
        invoice_number: inv.invoice_number,
        client_name: inv.client_name || get().currentUser.name,
        project_or_service: inv.project_or_service,
        type: 'Milestone Contract',
        amount_ugx: Number(inv.amount_ugx),
        status: inv.status,
        issue_date: inv.issue_date,
        due_date: inv.due_date,
        is_white_label: false,
        paid_at: inv.paid_at,
        payment_method: inv.payment_method,
        transaction_ref: inv.transaction_ref,
      }));
      set({ invoices: mappedInvoices, invoicesLoading: false });
    } catch (err: any) {
      set({
        invoicesError: err.response?.data?.message || err.message || 'Failed to load invoices from Billing API.',
        invoicesLoading: false,
      });
    }
  },

  fetchRetainers: async () => {
    set({ retainersLoading: true, retainersError: null });
    try {
      const res = await spmApi.getClientRetainers();
      const mappedRetainers: RetainerPlan[] = (res.data || []).map((r: any) => ({
        id: r.id,
        client_name: r.client_name || get().currentUser.name,
        tier: r.tier || 'Enterprise SLAAC Back-Office Retainer',
        monthly_plot_quota: r.monthly_plot_quota || 5000,
        plots_used_this_month: r.plots_used_this_month || 3840,
        monthly_fee_ugx: r.monthly_fee_ugx || 12500000,
        status: r.status || 'Active',
        billing_cycle_end: r.billing_cycle_end || '2026-09-30',
      }));
      set({ retainers: mappedRetainers, retainersLoading: false });
    } catch (err: any) {
      set({
        retainersError: err.response?.data?.message || err.message || 'Failed to load retainer data from Client API.',
        retainersLoading: false,
      });
    }
  },

  fetchAdminMetrics: async () => {
    set({ adminMetricsLoading: true, adminMetricsError: null });
    try {
      const res = await spmApi.getAdminMetrics();
      set({ adminMetrics: res, adminMetricsLoading: false });
    } catch (err: any) {
      set({
        adminMetricsError: err.response?.data?.message || err.message || 'Failed to load cluster metrics from Admin API.',
        adminMetricsLoading: false,
      });
    }
  },

  fetchAdminEvents: async () => {
    try {
      const res = await spmApi.getAdminEvents();
      set({ integrationEvents: res.data || res.events || [] });
    } catch (err: any) {
      console.error('Failed to load events:', err);
    }
  },

  fetchAuditLogs: async () => {
    try {
      const res = await spmApi.getAdminAuditLogs();
      set({ auditLogs: res.data || res.logs || [] });
    } catch (err: any) {
      console.error('Failed to load audit logs:', err);
    }
  },

  // Actions & Operations
  addProcessingJob: async (jobData) => {
    try {
      await spmApi.queueJob(jobData);
      get().showSnackbar('Job successfully queued in background processing runner', 'success');
      await get().fetchJobs();
    } catch (err: any) {
      get().showSnackbar(err.message || 'Failed to queue survey job', 'error');
    }
  },

  updateBrandingConfig: async (updates) => {
    try {
      await spmApi.updateClientBranding(updates);
      set({ brandingConfig: { ...get().brandingConfig, ...updates } });
      get().showSnackbar('Client branding and CAD Title Block updated successfully', 'success');
    } catch (err: any) {
      get().showSnackbar('Failed to update client branding', 'error');
    }
  },

  payInvoice: async (invoiceId: string, paymentMethod: string, phoneOrRef: string) => {
    try {
      const targetInvoice = get().invoices.find((i) => i.id === invoiceId);
      const amount = targetInvoice ? targetInvoice.amount_ugx : 8400000;
      await spmApi.sendMobileMoneyWebhook({
        invoiceId,
        amount,
        phone: phoneOrRef,
        provider: paymentMethod,
      });
      get().showSnackbar(`Payment for invoice ${targetInvoice?.invoice_number || invoiceId} processed via ${paymentMethod}`, 'success');
      await get().fetchInvoices();
    } catch (err: any) {
      get().showSnackbar('Payment webhook dispatch failed', 'error');
    }
  },

  enrollStudent: async (courseId, paymentMethod, phone) => {
    if (!get().currentUser.id) {
      get().showSnackbar('Please log in before enrolling into a course.', 'warning');
      return;
    }

    const course = get().courses.find((c) => c.id === courseId);
    const newEnrollment: StudentEnrollment = {
      id: `enr-${Date.now()}`,
      course_id: courseId,
      course_title: course ? course.title : 'Spatial Database Modelling with PostgreSQL & PostGIS',
      student_name: get().currentUser.name,
      student_email: get().currentUser.email,
      student_phone: phone,
      payment_method: paymentMethod,
      payment_status: 'Completed',
      transaction_ref: `MM-UG-${Math.floor(100000 + Math.random() * 900000)}`,
      amount_ugx: course ? course.price_ugx : 750000,
      enrolled_at: new Date().toISOString().split('T')[0],
      progress_percent: 0,
    };
    set({ enrollments: [newEnrollment, ...get().enrollments] });
    get().showSnackbar(`Enrolled into ${newEnrollment.course_title}!`, 'success');
  },

  triggerMobileMoneyWebhook: async (payload) => {
    try {
      await spmApi.sendMobileMoneyWebhook({
        invoiceId: payload.invoiceId,
        amount: payload.amountUgx,
        phone: payload.phone,
        provider: payload.provider,
      });
      get().showSnackbar(`Webhook simulated for ${payload.provider} (Amount: ${payload.amountUgx.toLocaleString()} UGX)`, 'success');
      await get().fetchInvoices();
      await get().fetchAdminEvents();
    } catch (err: any) {
      get().showSnackbar('Failed to trigger webhook simulation', 'error');
    }
  },

  recordDownload: async (fileId, fileName, format, sizeMb) => {
    try {
      const user = get().currentUser;
      if (!user.id) {
        get().showSnackbar('Please log in before downloading protected files.', 'warning');
        return;
      }
      const res = await spmApi.recordAuditDownload({
        deliverableId: fileId,
        fileName,
        format,
        sizeMb,
      });
      if (res.log) {
        set({ auditLogs: [res.log, ...get().auditLogs] });
      }
      get().showSnackbar(`Download authenticated & logged with SHA-256`, 'success');
    } catch (err: any) {
      console.error('Audit log error:', err);
    }
  },

  broadcastAdminEvent: async (eventType, module, payload) => {
    try {
      const res = await spmApi.broadcastAdminEvent({ event_type: eventType, module, payload });
      if (res.event) {
        set({ integrationEvents: [res.event, ...get().integrationEvents] });
      }
      get().showSnackbar(`Dispatched event ${eventType} across message broker`, 'info');
    } catch (err: any) {
      get().showSnackbar('Failed to broadcast event', 'error');
    }
  },

  // S3 Ingestion Pipeline
  startDirectS3Upload: (file, projectName, surveyType, targetCrs) => {
    const uploadId = `mpu-${Date.now()}`;
    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.max(1, Math.ceil(file.size / chunkSize));

    const chunks: MultipartUploadChunk[] = Array.from({ length: totalChunks }, (_, i) => ({
      partNumber: i + 1,
      startByte: i * chunkSize,
      endByte: Math.min((i + 1) * chunkSize, file.size),
      sizeBytes: Math.min(chunkSize, file.size - i * chunkSize),
      presignedUrl: `https://spm-geosolutions-survey-storage-eu-west.s3.amazonaws.com/uploads/${file.name}?partNumber=${i + 1}`,
      status: 'pending',
      progress: 0,
    }));

    set({
      activeUpload: {
        isUploading: true,
        isPaused: false,
        fileName: file.name,
        fileSizeBytes: file.size,
        surveyType,
        targetCrs,
        projectName,
        uploadId,
        s3Bucket: 'spm-geosolutions-survey-storage-eu-west',
        s3Key: `raw-surveys/${Date.now()}_${file.name}`,
        chunks,
        currentChunkIndex: 0,
        progressPercent: 0,
        uploadSpeedMbps: 28.5,
        etaSeconds: 12,
      },
    });

    let completed = 0;
    const interval = setInterval(() => {
      const current = get().activeUpload;
      if (!current || !current.isUploading || current.isPaused) {
        clearInterval(interval);
        return;
      }

      if (completed < current.chunks.length) {
        current.chunks[completed].status = 'completed';
        current.chunks[completed].progress = 100;
        completed++;
        const pct = Math.round((completed / current.chunks.length) * 100);

        set({
          activeUpload: {
            ...current,
            currentChunkIndex: completed,
            progressPercent: pct,
          },
        });
      } else {
        clearInterval(interval);
        set({
          activeUpload: {
            ...current,
            isUploading: false,
            progressPercent: 100,
          },
        });
        get().addProcessingJob({
          projectName,
          surveyType,
          targetCrs,
          rawFileName: file.name,
          rawFileSizeMb: Number((file.size / (1024 * 1024)).toFixed(1)),
        });
        get().showSnackbar(`Multipart S3 upload complete: ${file.name} sent to pipeline!`, 'success');
      }
    }, 600);
  },

  pauseUpload: () => {
    const cur = get().activeUpload;
    if (cur) set({ activeUpload: { ...cur, isPaused: true } });
  },

  resumeUpload: () => {
    const cur = get().activeUpload;
    if (cur) set({ activeUpload: { ...cur, isPaused: false } });
  },

  cancelUpload: () => {
    set({ activeUpload: null });
    get().showSnackbar('Upload cancelled', 'warning');
  },

  showSnackbar: (message, severity = 'info') => {
    set({ snackbar: { open: true, message, severity } });
  },

  closeSnackbar: () => {
    set({ snackbar: { ...get().snackbar, open: false } });
  },
}));
