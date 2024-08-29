import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import clsx from "clsx";

const AdvancedOrganizationForm = () => {
  const navigate = useNavigate();
  const [legalName, setLegalName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");

  const handleLegalNameChange = (e) => {
    setLegalName(e.target.value);
  };

  const handleRegistrationNumberChange = (e) => {
    setRegistrationNumber(e.target.value);
  };

  const handleVatNumberChange = (e) => {
    setVatNumber(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const handleSaveCustomer = () => {
    const data = {
      type: "organization",
      organization: {
        legalName,
        registrationNumber,
        vatNumber,
        type,
        registeredAddress: {
          country,
          city,
          postalCode,
          street,
        },
      },
    };
    console.log(data);
    axios
      .post("http://localhost:3000/customers", data)
      .then(() => {
        navigate("/playground");
      })
      .catch((error) => {
        alert("An error happend");
        console.log(error);
      });
  };
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
            type="text"
            value={legalName}
            onChange={handleLegalNameChange}
            placeholder="Company AB"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            )}
          />
        </Field>

        <Field>
          <Label className="text-sm/6 font-medium text-white">
            Registration number
          </Label>
          <Input
            type="text"
            value={registrationNumber}
            onChange={handleRegistrationNumberChange}
            placeholder="555555-5555"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            )}
          />
        </Field>

        <Field>
          <Label className="text-sm/6 font-medium text-white">VAT number</Label>
          <Input
            type="text"
            value={vatNumber}
            onChange={handleVatNumberChange}
            placeholder="SE555555555501"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            )}
          />
        </Field>

        <Field>
          <Label className="text-sm/6 font-medium text-white">
            Company type
          </Label>
          <div className="relative">
            <Select
              value={type}
              onChange={handleTypeChange}
              className={clsx(
                "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                // Make the text of each option black on Windows
                "*:text-black",
              )}
            >
              <option value="">Please select</option>
              <option value="privateCompany">Private company</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field>

        <Fieldset className="space-y-6 px-6 sm:p-10">
          <Legend className="text-base/7 font-semibold text-white">
            Registered address
          </Legend>

          <Field>
            <Label className="text-sm/6 font-medium text-white">Country</Label>
            <div className="relative">
              <Select
                value={country}
                onChange={handleCountryChange}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  // Make the text of each option black on Windows
                  "*:text-black",
                )}
              >
                <option value="">Please select</option>
                <option value="SE">Sweden</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">City</Label>

            <Input
              value={city}
              onChange={handleCityChange}
              placeholder="Stockholm"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              )}
            />
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">
              Postal code
            </Label>

            <Input
              value={postalCode}
              onChange={handlePostalCodeChange}
              placeholder="111 22"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              )}
            />
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">Street</Label>

            <Input
              value={street}
              onChange={handleStreetChange}
              placeholder="Kungsbron 2"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              )}
            />
          </Field>
        </Fieldset>

        <Button
          onClick={handleSaveCustomer}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 align-text-top text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Submit
        </Button>
      </Fieldset>
    </div>
  );
};

export default AdvancedOrganizationForm;
