import { AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";
import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { getPortfolioRecords } from "@/lib/adminStore";

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
  const item = (await getPortfolioRecords()).find((record) => record.id === params.id);
  return <AdminShell><AdminTitle title="Edit Project" />{item ? <PortfolioForm initial={item} /> : <p>Project not found.</p>}</AdminShell>;
}
