import { getOne } from "@/api/UserApi";
import Container from "@/components/Container";
import Link from "next/link";
import { redirect } from "next/navigation";
import CadForm from "../../components/CadForm";

export default async function CadEdit({ params }: { params: { id: string } }) {
    const data = await getOne(params.id);
    // if (!data) {
    //     redirect("/usuario");
    // }
    return (
        <Container>
            <>
                {data.user && <CadForm user={data.user} />}
                {!data.user &&
                    <div className="bg-slate-300 rounded-md p-12 shadow-2xl">
                        <h1 className="mb-5 text-3xl">{data.message}</h1>
                        <Link className="bg-green-800 rounded-lg p-2" href={"/usuario/"}>Voltar para usuários</Link>
                    </div>
                }
            </>
        </Container>
    )
}