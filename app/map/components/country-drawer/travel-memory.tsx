"use client";

import { useState, useActionState, useEffect } from "react";
import { Pencil, Save } from "lucide-react";
import { toast } from "sonner";
import { updateTravelMemory, State } from "@/actions/footprints";
import { Footprint } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";
import DatePicker from "./date-picker";
import ImageUploadWall from "./image-upload-wall";

type TravelMemoryProps = {
  footprint: Footprint;
};

export default function TravelMemory({
  footprint: {
    country_name,
    date: initialDate,
    stories: initialStories,
    photos: initialPhotos,
  },
}: TravelMemoryProps) {
  const [date, setDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined
  );
  const [stories, setStories] = useState<string>(initialStories || "");
  const [photos, setPhotos] = useState<string[]>(initialPhotos || []);
  const [isEditing, setIsEditing] = useState(false);

  const initialState: State = {};
  const [state, action, pending] = useActionState(
    updateTravelMemory,
    initialState
  );
  useEffect(() => {
    if (!state.hasOwnProperty("success")) return;
    if (state.success) {
      toast.success("Update travel memory successfully.");
    } else {
      toast.error(state.msg);
    }
  }, [state]);

  const handleSave = () => {
    console.log(
      "countryName",
      country_name,
      "date",
      date?.toISOString() || "",
      "photos",
      photos,
      "stories",
      stories
    );
    // startTransition(() => {
    //   action({
    //     countryName: country_name,
    //     date: date?.toISOString() || "",
    //     photos,
    //     stories,
    //   });
    // });
  };

  return (
    <>
      <div
        className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${
          isEditing ? "pb-[80px]" : ""
        }`}
      >
        <hr className="border-gray-200 my-4" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Your travel memory</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm flex items-center text-blue-500 font-medium hover:text-blue-600 cursor-pointer"
            >
              <Pencil size={12} className="mr-1" />
              Edit
            </button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Visit date</h3>
          <DatePicker date={date} onChange={setDate} disabled={!isEditing} />
        </div>
        <div className="block text-sm font-medium text-gray-700 my-3">
          Photos
        </div>
        <ImageUploadWall
          images={photos}
          onChange={setPhotos}
          isEditing={isEditing}
        />
        <div className="block text-sm font-medium text-gray-700 my-3">
          Stories
        </div>
        {isEditing ? (
          <textarea
            rows={12}
            value={stories}
            onChange={(e) => setStories(e.target.value)}
            placeholder="write your travel stories here ..."
            className="block w-full p-3 border border-gray-200 rounded-lg text-sm resize-none"
          />
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100">
            {stories || "no stories for now..."}
          </div>
        )}
      </div>
      {isEditing && (
        <div className="absolute z-10 bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button
            onClick={handleSave}
            className="flex-2 flex items-center justify-center py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
            disabled={pending}
          >
            {pending ? (
              <>
                <Spinner className="mr-2" />
                Saving
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save
              </>
            )}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}
