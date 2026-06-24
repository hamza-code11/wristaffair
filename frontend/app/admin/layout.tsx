import AdminLayout from '../components/admin/layout/AdminLayout';

export default function AdminPageLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <AdminLayout>{children}</AdminLayout>;
}