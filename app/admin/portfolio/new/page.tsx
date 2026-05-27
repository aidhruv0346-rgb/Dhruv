import { AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";
import { PortfolioForm } from "@/components/admin/PortfolioForm";

export default function NewPortfolioPage() {
  return <AdminShell><AdminTitle title="Add New Project" /><PortfolioForm /></AdminShell>;
}
