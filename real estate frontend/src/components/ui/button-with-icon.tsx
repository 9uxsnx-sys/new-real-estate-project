import { Button } from "@/components/ui/button";

const ButtonWithIcon = () => {
  return (
    <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer bg-black text-white">
      <span className="relative z-10 transition-all duration-500">
        Let's Collaborate
      </span>
    </Button>
  );
};

export default ButtonWithIcon;