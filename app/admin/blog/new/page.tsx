import { AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";
import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return <AdminShell><AdminTitle title="Write New Post" /><BlogForm /></AdminShell>;
}
