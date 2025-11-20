import Error from "@/components/Error";
import { UrlState } from "@/context";
import { api } from "@/lib/axios";
import { LinkIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Copy, Download, Trash } from "lucide-react";
import { BeatLoader } from "react-spinners";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LocationStats from "@/components/LocationStats";
import DeviceStats from "@/components/DeviceStats";

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState();
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  useEffect(() => {
    async function fetchData(id) {
      try {
        const data = await api.get(`/url/analytics/${id}`);
        // console.log(data.data.data);
        setUrl(() => data.data.data);
      } catch (error) {
        console.log(error);
        // setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData(id);
  }, [id]);

  async function deleteUrl() {
    try {
      setLoading(true);
      await api.delete(`/url/delete/${url._id}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <>
        <Error message={"Internal Server Error"} />
      </>
    );
  }

  return (
    <>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        {/* left side */}
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`http://localhost:5173/${url?.shortId}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            http://localhost:5173/{url?.shortId}
          </a>
          <a
            href={url?.redirectURL}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.redirectURL}
          </a>

          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.createdAt).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `http://localhost:5173/${url.shortId}`
                )
              }
            >
              <Copy />
            </Button>

            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>

            <Button variant="ghost" onClick={deleteUrl} disabled={loading}>
              {loading ? <BeatLoader size={5} color="white" /> : <Trash />}
            </Button>
          </div>
          <img
            src={url?.qr}
            alt="qr code"
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
          />
        </div>

        {/* right side */}
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>

          {url?.visitHistory === 0 ? (
            <CardContent>No Statistics Yet</CardContent>
          ) : (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{url?.visitHistory.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              {url?.visitHistory && <LocationStats stats={url?.visitHistory} />}
              <CardTitle>Device Info</CardTitle>
              {url?.visitHistory && <DeviceStats stats={url.visitHistory} />}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
