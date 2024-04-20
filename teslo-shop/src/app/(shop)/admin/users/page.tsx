import { redirect } from "next/navigation";
import { getPaginatedUsers } from "@/actions";
import { Pagination, Title } from "@/components";
import { UserTable } from "./ui/UserTable";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const take = searchParams.take ? Number(searchParams.take) : 10;

  const { ok, users = [], totalPages } = await getPaginatedUsers({ page, take });

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Manage users" />

      <div className="mb-10">
        <UserTable users={users} />
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
    </>
  );
}
