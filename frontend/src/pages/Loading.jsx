import React from "react";
import { Spinner } from "@/components/ui/spinner";
function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center gap-2">
      <Spinner className="size-8" />
      <span className="">Loading...</span>
    </div>
  );
}

export default Loading;
