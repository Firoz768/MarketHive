import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
export default function Home() {

  return (
    <div className="flex flex-col gap-y-4 p-4" >
      <div>
        <Button  variant={"elevated"} >Hello</Button>
      </div>
      <div>
        <Input type="text" placeholder="hello" />
      </div>
      <div>
        <Progress value={50} />
      </div>
       <div>
        <Textarea placeholder="hello" />
      </div>
      <div>
        <Checkbox/>
      </div>
    </div>
  )
}
