import { AdminTitle } from "@/components/admin/AdminCards";
import { AdminShell } from "@/components/admin/AdminSidebar";
import { BlogForm } from "@/components/admin/BlogForm";
import { getBlogRecords } from "@/lib/adminStore";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const item = (await getBlogRecords()).find((record) => record.id === params.id);
  return <AdminShell><AdminTitle title="Edit Blog Post" />{item ? <BlogForm initial={item} /> : <p>Post not found.</p>}</AdminShell>;
}
