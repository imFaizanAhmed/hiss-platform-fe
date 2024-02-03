import { useQuery } from "react-query";
import axios from "axios";

const CallAPI = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ["hello-world"],
    queryFn: () => axios.get("http://localhost:3000"),
  });

  return (
    <>
      {isLoading ? <div>Loading...</div> : <>{data && <div>{data.data}</div>}</>}
    </>
  );
};

export default CallAPI;
