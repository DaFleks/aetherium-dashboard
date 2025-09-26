"use client";

import { useRef, useState } from "react";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserCircleIcon } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import Container from "./aetherium/Container";
import LabelInput from "./aetherium/LabelInput";

import provinces from "@/lib/provinces.json";
import { userSchema } from "@/lib/formSchemas";
import { addUser } from "@/lib/api/fetch/fetchUser";
import { toast } from "sonner";
import Loading from "./aetherium/Loading/Loading";
import { useToggle } from "@/hooks/useToggle";

const UserForm = () => {
  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);
  const [isLoading, handleIsLoading] = useToggle(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    inputRef.current?.click();
  };

  const handleClearAvatar = () => {
    inputRef.current!.value = "";
    setAvatarImage(undefined);
  };

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "GUEST",
      permissions: "",
      streetAddress: "",
      city: "",
      province: "",
      postalCode: "",
      phoneNumber: "",
      avatar: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    handleIsLoading();
    const formData = new FormData();

    // eslint-disable-next-line prefer-const
    for (let key in values) {
      const typedKey = key as keyof typeof values;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append(key, values[typedKey] as any);
    }

    const response = await addUser(formData);
    handleIsLoading();
    if (response.status !== 200) toast.error(response.message);

    if (response.status === 200) {
      toast.success("User Successfully Created!");
      form.reset();
      //  form.reset() didnt reset the value of the file input
      inputRef.current!.value = "";
      setAvatarImage(undefined);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-2 gap-4">
        {/* AVATAR */}
        <Container className="flex flex-col justify-center items-center gap-12 bg-slate-100 rounded-xl h-full border">
          <Avatar className="size-56 text-5xl shadow-lg shadow-neutral-300">
            <AvatarImage src={avatarImage} />
            <AvatarFallback className="bg-neutral-100 border border-slate-300">
              <UserCircleIcon className="w-24 h-24 text-neutral-400" />
            </AvatarFallback>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      id="avatar"
                      type="file"
                      ref={inputRef}
                      className="hidden"
                      disabled={isLoading}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                        if (file) setAvatarImage(URL.createObjectURL(file));
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Avatar>
          <Button
            variant={avatarImage ? "destructive" : "outline"}
            type="button"
            className="w-1/2"
            onClick={avatarImage ? handleClearAvatar : handleFileClick}>
            {`${avatarImage ? "Remove" : "Upload"} Photo`}
          </Button>
        </Container>

        <Container className="space-y-4 bg-slate-100 rounded-xl p-8 border">
          <Container className="grid grid-cols-2 gap-4">
            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LabelInput id="email" label="Email" placeholder="Email" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LabelInput id="password" label="Password" type="password" placeholder="Password" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </Container>

          <Container className="space-y-2">
            <Label htmlFor="firstName">Full Name</Label>
            <Container className="grid grid-cols-2 gap-4">
              {/* FIRST NAME */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LabelInput id="firstName" placeholder="First Name" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* LAST NAME */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LabelInput id="lastName" placeholder="Last Name" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </Container>
          </Container>

          <Container className="grid grid-cols-2 gap-4">
            <Container className="space-y-2">
              {/* ROLE */}
              <Label htmlFor="role">Role</Label>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue="GUEST">
                      <FormControl>
                        <SelectTrigger id="role" className="w-full" disabled={isLoading}>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MODERATOR">Moderator</SelectItem>
                        <SelectItem value="GUEST">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </Container>

            {/* PERMISSIONS */}
            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LabelInput id="permissions" label="Permissions (comma separated)" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </Container>

          <Container className="grid grid-cols-6 gap-4">
            {/* STREET ADDRESS */}
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormControl>
                    <LabelInput id="streetAddress" label="Street" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* CITY */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <LabelInput id="city" label="City" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Container className="space-y-2 col-span-2">
              {/* PROVINCE */}
              <Label htmlFor="role">Province</Label>
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full overflow-hidden" disabled={isLoading}>
                        <SelectValue placeholder="Province" />
                      </SelectTrigger>
                      <SelectContent side="right">
                        {provinces.map((province) => (
                          <SelectItem key={province.abbreviation} value={province.abbreviation}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </Container>

            {/* POSTAL CODE */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <LabelInput id="postalCode" label="Postal Code" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* PHONE NUMBER */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <LabelInput id="phoneNumber" label="Phone Number" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </Container>

          <Button type="submit" className="w-1/2 ml-auto flex mt-6">
            Submit
          </Button>
        </Container>
      </form>
      {isLoading && <Loading variant="fixed" />}
    </Form>
  );
};

export default UserForm;
