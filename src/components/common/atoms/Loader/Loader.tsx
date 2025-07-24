import { Loader2 } from "lucide-react";
import { LoaderProps } from "./Loader.types";

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
