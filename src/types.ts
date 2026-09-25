export type UserRole = 'admin' | 'staff' | 'client' | 'student';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  organization?: string;
  avatar?: string;
  phone?: string;
  license_number?: string;
}

export interface UserSettings {
  email_notifications: boolean;
  sms_notifications: boolean;
  two_factor_auth: boolean;
  theme: 'light' | 'dark' | 'system';
  default_crs: string;
  auto_download_deed_plans: boolean;
}

// 3 Core Frontend Folder Models
export type FrontendFolderModel = '(main)' | 'client' | 'admin';

// Destination views in (main) folder
export type MainDestination =
  | 'home'
  | 'services'
  | 'academy'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'login'
  | 'register'
  | 'quote-calculator'
  | 'verify-certificate'
  | 'code-architecture';

// Destination views in client folder
export type ClientDestination =
  | 'overview'
  | 'uploader'
  | 'pipeline'
  | 'gis-studio'
  | 'academy'
  | 'billing'
  | 'branding'
  | 'profile'
  | 'settings'
  | 'downloads'
  | 'make-payment';

// Destination views in admin folder (admin subdomain)
export type AdminDestination =
  | 'dashboard'
  | 'users'
  | 'cluster'
  | 'event-bus'
  | 'audit-trail';

export type SurveyDomain =
  | 'gnss_topographic'
  | 'levelling'
  | 'cadastral_slaac'
  | 'lidar_survey'
  | 'photogrammetry'
  | 'bathymetric'
  | 'underground_utility';

export type JobStatus = 'queued' | 'processing' | 'qa_review' | 'completed' | 'failed';

export interface SpatialPolygon {
  type: 'Polygon';
  coordinates: number[][][]; // [[[lng, lat], ...]]
}

export interface ProcessingJob {
  id: string;
  client_id: string;
  client_name: string;
  project_name: string;
  survey_type: SurveyDomain;
  status: JobStatus;
  progress: number;
  current_stage: string;
  target_crs: string; // e.g. "EPSG:32636 (UTM Zone 36N)"
  project_boundary?: SpatialPolygon;
  raw_file_name: string;
  raw_file_size_mb: number;
  uploaded_at: string;
  estimated_completion: string;
  analyst_assigned?: string;
  qa_score?: number;
  qa_checks: {
    check_name: string;
    passed: boolean;
    notes: string;
  }[];
  deliverables: {
    id: string;
    name: string;
    format: 'DWG' | 'PDF' | 'LandXML' | 'GeoTIFF' | 'LAS' | 'Shapefile' | 'CSV' | 'DXF' | 'GeoJSON';
    size_mb: number;
    download_url: string;
    description: string;
  }[];
}

export interface SpatialAssetRecord {
  id: string;
  job_id: string;
  asset_type: 'raw_gnss' | 'point_cloud_las' | 'orthomosaic_geotiff' | 'cad_dwg' | 'deed_pdf';
  s3_bucket: string;
  s3_key: string;
  file_size_bytes: number;
  etag: string;
  metadata: {
    crs: string;
    point_count?: number;
    resolution_cm?: number;
    sha256: string;
  };
  created_at: string;
}

export interface MultipartUploadChunk {
  partNumber: number;
  startByte: number;
  endByte: number;
  sizeBytes: number;
  presignedUrl: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number;
  etag?: string;
}

export interface DownloadAuditLog {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  role: UserRole;
  ip_address: string;
  file_id: string;
  file_name: string;
  format: string;
  file_size_mb: number;
  timestamp: string;
  sha256_checksum: string;
}

export interface IntegrationEvent {
  id: string;
  event_type: string;
  payload: Record<string, unknown>;
  published_at: string;
  module: string;
}

export interface ClientBrandingConfig {
  firm_name: string;
  registration_no: string;
  registered_surveyor: string;
  surveyor_stamp_text: string;
  primary_color: string;
  logo_url: string;
  paper_size: 'A0' | 'A1' | 'A2' | 'A3' | 'A4';
  disclaimer: string;
}

export interface GisConsultancyProject {
  id: string;
  title: string;
  client: string;
  category: 'Web GIS Dashboard' | 'Database Management' | 'Project Execution' | 'Spatial Analysis' | 'Cartography';
  status: 'In Scoping' | 'Data Audit' | 'Database Design' | 'Staging Deployment' | 'Completed';
  target_crs: string;
  target_platform: 'Leaflet' | 'GeoServer' | 'ArcGIS Enterprise' | 'QGIS Server' | 'PostGIS Cloud';
  progress: number;
  created_at: string;
  delivery_date: string;
  budget_ugx: number;
  description: string;
  milestones: {
    id: string;
    title: string;
    due_date: string;
    completed: boolean;
  }[];
}

export interface TrainingCourse {
  id: string;
  title: string;
  track: string;
  level: string;
  capacity: number;
  enrolled: number;
  start_date: string;
  duration_weeks: number;
  price_ugx: number;
  price_usd: number;
  instructor: string;
  equipment_used: string[];
  prerequisites: string;
  description: string;
  modules: string[];
  is_certified: boolean;
  image_url?: string;
}

export interface StudentEnrollment {
  id: string;
  course_id: string;
  course_title: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  payment_method: 'MTN Mobile Money' | 'Airtel Money' | 'Bank Transfer';
  payment_status: 'Completed' | 'Pending' | 'Failed';
  transaction_ref: string;
  amount_ugx: number;
  enrolled_at: string;
  progress_percent: number;
  grade?: string;
  certificate_id?: string;
  certificate_url?: string;
}

export interface InvoiceRecord {
  id: string;
  invoice_number: string;
  client_name: string;
  project_or_service: string;
  type: string;
  amount_ugx: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  issue_date: string;
  due_date: string;
  is_white_label: boolean;
  white_label_firm?: string;
  paid_at?: string | null;
  payment_method?: string;
  transaction_ref?: string | null;
}

export interface RetainerPlan {
  id: string;
  client_name: string;
  tier: string;
  monthly_plot_quota: number;
  plots_used_this_month: number;
  monthly_fee_ugx: number;
  status: 'Active' | 'Delinquent' | 'Surge Pending';
  billing_cycle_end: string;
}
