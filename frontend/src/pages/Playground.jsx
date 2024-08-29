import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import SimpleOrganizationForm from "../components/SimpleOrganizationForm";
import { BriefcaseIcon } from "@heroicons/react/20/solid";
import AdvancedOrganizationForm from "../components/AdvancedOrganizationForm";

const onboardingTypes = [
  {
    name: "Advanced",
    content: <AdvancedOrganizationForm />,
  },
  {
    name: "Simple",
    content: <SimpleOrganizationForm />,
  },
];

export default function Example() {
  return (
    <div className="flex h-screen w-full justify-center px-4 pt-24">
      <div className="w-full max-w-md">
        <TabGroup>
          <TabList className="flex gap-4">
            {onboardingTypes.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3">
            {onboardingTypes.map(({ name, content }) => (
              <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                {content}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
