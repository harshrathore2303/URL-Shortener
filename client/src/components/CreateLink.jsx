import { UrlState } from "@/context";
import React, { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import * as Yup from "yup";
import QRCode from "react-qrcode-logo";
import { api } from "@/lib/axios";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState();
  const [formValues, setFormValues] = useState({
    title: "",
    url: longLink ? longLink : "",
  });

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    url: Yup.string()
      .url("Must be a valid url")
      .required("Long url is required"),
  });

  function handleChange(e) {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSave() {
    setLoading(true);
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      // console.log("sdvsv")
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("url", formValues.url);
      formData.append("qr", blob);

      const res = await api.post("/url/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/link/${res.data.shortId}`);
    } catch (e) {
      if (e?.inner) {
        const newErrors = {};
        e?.inner?.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }

      if (e?.response) {
        setErrors({
          backend: e.response.data.message || "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>
        {formValues?.url && (
          <QRCode value={formValues?.url} size={250} ref={ref} />
        )}
        <Input
          id="title"
          placeholder="Short links title"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}
        <Input
          id="url"
          placeholder="Enter your long url"
          value={formValues.url}
          onChange={handleChange}
        />
        {errors.url && <Error message={errors.url} />}
        {errors.backend && <Error message={errors.backend} />}
        <DialogFooter className="sm:justify-start">
          <Button variant="destructive" onClick={handleSave} disabled={loading}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
