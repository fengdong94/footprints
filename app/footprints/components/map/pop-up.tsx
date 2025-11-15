import { Button } from "@/components/ui/button"

// TODO use shadcn button in all pages
export default function PopUp() {
  return <div className="fixed w-1/4 top-20 bg-emerald-200">
    <Button className="mr-4">visited</Button>
    <Button>add to wishlist</Button>
  </div>;
}
