import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
} from "@headlessui/react";
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

function handleClick(e) {
  console.log(e);
}

const SimpleOrganizationForm = () => {
  return (
    <div className="w-full max-w-lg px-4">
      <Fieldset className="space-y-6 rounded-xl p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold text-white">
          Organization onboarding
        </Legend>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Legal name</Label>
          <Description className="text-sm/6 text-white/50">
            The registered name of your company.
          </Description>
          <Input
            placeholder="AxelCorp AB"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            )}
          />
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Country</Label>
          <Description className="text-sm/6 text-white/50">
            The country where your business is registered.
          </Description>
          <div className="relative">
            <Select
              className={clsx(
                "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                // Make the text of each option black on Windows
                "*:text-black",
              )}
            >
              <option value="SE">Sweden</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field>

        <Button
          onClick={handleClick}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Submit
        </Button>
      </Fieldset>
    </div>
  );
};

export default SimpleOrganizationForm;
