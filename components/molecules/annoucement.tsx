import { getAnnoucement } from "@/api";
import { CircleAlert } from "lucide-react";
import { TextAnimate } from "./text-animate";

export const Annoucement = async () => {
  const response = await getAnnoucement({
    platType: "feibo",
    langCode: "zh-cn",
    lstStatus: ["Published"],
  });

  if (response?.code != 200 || !response?.data?.length) return null;

  const textDisplay = (response?.data || [])?.map((x) => x.text);

  return (
    <div className="rounded-lg max-sm:outline max-sm:outline-offset-4 max-sm:outline-gray-50/10">
      <div className="flex flex-col sm:flex-row max-sm:space-y-1 sm:items-center py-2 px-4 bg-gradient-to-r from-tertiary to-primary rounded-xl">
        <div className="shrink-0 basis-3/11 sm:basis-2/11 xl:basis-2/16">
          <div className="flex items-center space-x-2">
            <span>
              <CircleAlert className="text-red-500" />
            </span>
            <h4 className="font-bold sm:text-lg">重要通知</h4>
          </div>
        </div>

        <div className="relative basis-8/11 sm:basis-9/11 overflow-hidden xl:basis-14/16">
          <TextAnimate items={[...textDisplay]} />
        </div>
      </div>
    </div>
  );
};
