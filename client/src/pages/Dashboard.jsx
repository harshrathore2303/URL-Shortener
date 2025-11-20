// can add sonner from shadcn ui after link created

import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import {Filter} from "lucide-react";
import { api } from "@/lib/axios";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import CreateLink from "@/components/CreateLink";
import {UrlState} from "@/context";
import Error from "@/components/Error";
import LinkCard from "@/components/LinkCard";
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = UrlState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [links, setLinks] = useState([]);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    async function fetchLinks(){
      try {
        const data = await api.get('/url/getAll');
        setLinks(data.data);
      } catch (error) {
        setError(error?.response?.data?.message)
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, []);

  useEffect(() => {
    async function fetchClicks() {
      const data = await api.get('/url/totalClick');
      setClicks(data.data.totalClicks);
    }
    fetchClicks();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {(loading) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks}</p>
          </CardContent>
        </Card>
        
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error} />}
      {links.map(url => (
        <LinkCard key={url._id} url={url}/>
      ))}

    </div>
  );
};
export default Dashboard;