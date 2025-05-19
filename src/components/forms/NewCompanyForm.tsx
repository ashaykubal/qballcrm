
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { countries } from "@/lib/country-data";

// Form schema with validation
const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  address: z.string().optional(),
  companyType: z.enum(["Corporate", "Investor"]),
  hqCountry: z.string().min(1, "Please select a country"),
});

type FormValues = z.infer<typeof formSchema>;

interface NewCompanyFormProps {
  onCancel: () => void;
  onSuccess?: (data: FormValues) => void;
}

const NewCompanyForm = ({ onCancel, onSuccess }: NewCompanyFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryFilter, setCountryFilter] = useState("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      address: "",
      companyType: "Corporate",
      hqCountry: "",
    },
  });

  const filteredCountries = countryFilter
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(countryFilter.toLowerCase())
      )
    : countries;

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Here you would typically save to your database
      console.log("Form data submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Company created successfully!");
      
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create company. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Type *</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Investor">Investor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hqCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HQ Country *</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Search countries..."
                      value={countryFilter}
                      onChange={(e) => setCountryFilter(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  {filteredCountries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewCompanyForm;
