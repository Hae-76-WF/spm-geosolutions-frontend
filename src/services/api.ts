import axios from 'axios';

// Create configured Axios instance for SPM Geosolutions API
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.spmgeosolutions.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for attaching auth tokens
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('spm_auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected geospatial API error occurred';
    console.error('[SPM Geosolutions API Error]:', message);
    return Promise.reject(error);
  }
);

export const spmApi = {
  // Auth API
  login: async (credentials: { email: string; password?: string }) => {
    const res = await apiClient.post('/auth/login', credentials);
    if (res.data.token && typeof window !== 'undefined') {
      localStorage.setItem('spm_auth_token', res.data.token);
    }
    return res.data;
  },

  register: async (payload: {
    name: string;
    email: string;
    password?: string;
    role?: string;
    organization?: string;
    phone?: string;
    licenseNumber?: string;
  }) => {
    const res = await apiClient.post('/auth/register', payload);
    if (res.data.token && typeof window !== 'undefined') {
      localStorage.setItem('spm_auth_token', res.data.token);
    }
    return res.data;
  },

  verifyEmailOtp: async (payload: { email: string; otp: string }) => {
    const res = await apiClient.post('/auth/verify-otp', payload);
    if (res.data.token && typeof window !== 'undefined') {
      localStorage.setItem('spm_auth_token', res.data.token);
    }
    return res.data;
  },

  resendEmailOtp: async (email: string) => {
    const res = await apiClient.post('/auth/resend-otp', { email });
    return res.data;
  },

  forgotPassword: async (email: string) => {
    const res = await apiClient.post('/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async (payload: {
    email: string;
    token: string;
    password?: string;
    password_confirmation?: string;
  }) => {
    const res = await apiClient.post('/auth/reset-password', payload);
    return res.data;
  },

  logout: async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('spm_auth_token');
      localStorage.removeItem('spm_current_user');
    }
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore if server endpoint fails on token revocation
    }
  },

  getUsers: async () => {
    const res = await apiClient.get('/auth/users');
    return res.data;
  },

  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },

  // User Profile & Settings API
  getUserProfile: async () => {
    const res = await apiClient.get('/user/profile');
    return res.data;
  },

  updateUserProfile: async (payload: {
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    license_number?: string;
  }) => {
    const res = await apiClient.put('/user/profile', payload);
    return res.data;
  },

  changeUserPassword: async (payload: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }) => {
    const res = await apiClient.put('/user/password', payload);
    return res.data;
  },

  getUserSettings: async () => {
    const res = await apiClient.get('/user/settings');
    return res.data;
  },

  updateUserSettings: async (settings: any) => {
    const res = await apiClient.put('/user/settings', settings);
    return res.data;
  },

  // Survey Processing Pipeline API
  getJobs: async () => {
    const res = await apiClient.get('/pipeline/jobs');
    return res.data;
  },

  queueJob: async (jobData: {
    projectName: string;
    surveyType: string;
    targetCrs: string;
    rawFileName?: string;
    rawFileSizeMb?: number;
  }) => {
    const res = await apiClient.post('/pipeline/queue-job', jobData);
    return res.data;
  },

  // PostGIS & Geodesy API
  getParcels: async (query?: string) => {
    const res = await apiClient.get('/gis/parcels', { params: { query } });
    return res.data;
  },

  transformCrs: async (payload: { lat: number; lng: number; sourceCrs?: string; targetCrs?: string }) => {
    const res = await apiClient.post('/gis/transform-crs', payload);
    return res.data;
  },

  balanceBowditchTraverse: async (payload: {
    startingStation: { station: string; easting: number; northing: number };
    closingStation: { station: string; easting: number; northing: number };
    observations: Array<{ station: string; target: string; bearingDeg: number; horizontalDistance: number }>;
  }) => {
    const res = await apiClient.post('/gis/bowditch-traverse', payload);
    return res.data;
  },

  // Direct S3 Multipart Upload API
  initiateMultipartUpload: async (payload: {
    fileName: string;
    fileSizeBytes: number;
    mimeType?: string;
    projectDomain?: string;
  }) => {
    const res = await apiClient.post('/s3/initiate-multipart', payload);
    return res.data;
  },

  recordChunkPart: async (payload: { uploadId: string; partNumber: number; etag?: string }) => {
    const res = await apiClient.post('/s3/record-part', payload);
    return res.data;
  },

  completeMultipartUpload: async (payload: { uploadId: string }) => {
    const res = await apiClient.post('/s3/complete-multipart', payload);
    return res.data;
  },

  // SPM Academy API
  getCourses: async () => {
    const res = await apiClient.get('/academy/courses');
    return res.data;
  },

  verifyCertificate: async (certId: string) => {
    const res = await apiClient.get(`/academy/verify-certificate/${certId}`);
    return res.data;
  },

  // Invoicing & Mobile Money API
  getInvoices: async () => {
    const res = await apiClient.get('/billing/invoices');
    return res.data;
  },

  sendMobileMoneyWebhook: async (payload: {
    invoiceId?: string;
    amount: number;
    phone: string;
    provider?: string;
    transactionRef?: string;
    transactionId?: string;
    externalId?: string;
    currency?: string;
    financialTransactionId?: string;
    payer?: { partyIdType: string; partyId: string };
    status?: string;
  }) => {
    const res = await apiClient.post('/billing/webhook/momo', payload);
    return res.data;
  },

  // Quotation Engine API
  requestQuotation: async (quoteData: any) => {
    const res = await apiClient.post('/quotes/calculate', quoteData);
    return res.data;
  },

  // Client Portal API
  getClientProfile: async () => {
    const res = await apiClient.get('/client/profile');
    return res.data;
  },

  getClientRetainers: async () => {
    const res = await apiClient.get('/client/retainers');
    return res.data;
  },

  getClientBranding: async () => {
    const res = await apiClient.get('/client/branding');
    return res.data;
  },

  updateClientBranding: async (branding: any) => {
    const res = await apiClient.put('/client/branding', branding);
    return res.data;
  },

  // Admin Subdomain & Full Control API
  getAdminMetrics: async () => {
    const res = await apiClient.get('/admin/metrics');
    return res.data;
  },

  getAdminEvents: async () => {
    const res = await apiClient.get('/admin/events');
    return res.data;
  },

  broadcastAdminEvent: async (event: { event_type: string; module: string; payload: any }) => {
    const res = await apiClient.post('/admin/broadcast-event', event);
    return res.data;
  },

  getAdminAuditLogs: async () => {
    const res = await apiClient.get('/admin/audit-logs');
    return res.data;
  },

  recordAuditDownload: async (payload: any) => {
    const res = await apiClient.post('/admin/audit-download', payload);
    return res.data;
  },

  // Admin Users & RBAC
  getAdminUsers: async () => {
    const res = await apiClient.get('/admin/users');
    return res.data;
  },

  createAdminUser: async (payload: any) => {
    const res = await apiClient.post('/admin/users', payload);
    return res.data;
  },

  updateAdminUserRole: async (userId: string, role: string) => {
    const res = await apiClient.put(`/admin/users/${userId}/role`, { role });
    return res.data;
  },

  toggleAdminUserStatus: async (userId: string) => {
    const res = await apiClient.put(`/admin/users/${userId}/status`);
    return res.data;
  },

  deleteAdminUser: async (userId: string) => {
    const res = await apiClient.delete(`/admin/users/${userId}`);
    return res.data;
  },

  // Admin Courses CRUD
  getAdminCourses: async () => {
    const res = await apiClient.get('/admin/courses');
    return res.data;
  },

  createAdminCourse: async (payload: any) => {
    const res = await apiClient.post('/admin/courses', payload);
    return res.data;
  },

  updateAdminCourse: async (courseId: string, payload: any) => {
    const res = await apiClient.put(`/admin/courses/${courseId}`, payload);
    return res.data;
  },

  deleteAdminCourse: async (courseId: string) => {
    const res = await apiClient.delete(`/admin/courses/${courseId}`);
    return res.data;
  },

  // Admin Products CRUD
  getAdminProducts: async () => {
    const res = await apiClient.get('/admin/products');
    return res.data;
  },

  createAdminProduct: async (payload: any) => {
    const res = await apiClient.post('/admin/products', payload);
    return res.data;
  },

  updateAdminProduct: async (productId: string, payload: any) => {
    const res = await apiClient.put(`/admin/products/${productId}`, payload);
    return res.data;
  },

  deleteAdminProduct: async (productId: string) => {
    const res = await apiClient.delete(`/admin/products/${productId}`);
    return res.data;
  },

  // Admin Invoices & Billing CRUD
  getAdminInvoices: async () => {
    const res = await apiClient.get('/admin/invoices');
    return res.data;
  },

  createAdminInvoice: async (payload: any) => {
    const res = await apiClient.post('/admin/invoices', payload);
    return res.data;
  },

  updateAdminInvoiceStatus: async (invoiceId: string, status: string) => {
    const res = await apiClient.put(`/admin/invoices/${invoiceId}/status`, { status });
    return res.data;
  },

  deleteAdminInvoice: async (invoiceId: string) => {
    const res = await apiClient.delete(`/admin/invoices/${invoiceId}`);
    return res.data;
  },
};
