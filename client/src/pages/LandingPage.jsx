import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`); 
    }
  }
  return (
    <div className="flex flex-col items-center ">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The Only URL Shortener <br /> you&rsquo;ll ever need!
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:h-14 sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          placeholder="Enter your long URL"
          className="h-full flex-1 py-4 px-4"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      {/* Add Image for banner*/}
      <img
        src="https://as2.ftcdn.net/jpg/02/98/90/73/1000_F_298907359_ciqlDb1SVxmr3PIv5wKcYqZ1rvsX7E8a.webp"
        alt=""
        className="w-full my-11 md:px-11"
      />

      <Accordion type="multiple" collapsible="true" className="w-full md:px-11">
        <AccordionItem value="how-it-works">
          <AccordionTrigger>How does the URL shortener work?</AccordionTrigger>
          <AccordionContent>
            We take your long URL, generate a unique short ID, and redirect
            anyone who clicks the short link back to your original website.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="permanent">
          <AccordionTrigger>Is the short link permanent?</AccordionTrigger>
          <AccordionContent>
            Yes. Once created, your short link stays active unless you manually
            delete it from your dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="analytics">
          <AccordionTrigger>Do you track analytics?</AccordionTrigger>
          <AccordionContent>
            Yes. We track total clicks, location data, device type, and
            referrers so you can understand your audience better.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
