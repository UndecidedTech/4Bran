import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Cascade() {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ['thread', params.id],
    queryFn: async () => {
      const response = await fetch(`/api/replies/${params.id}`)
      return response.json();
    }
  })

  return (
    <div>

    </div>
  )
}