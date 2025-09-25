"use client";

import { useRef, useState } from "react";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import Container from "./aetherium/Container";
import LabelInput from "./aetherium/LabelInput";

import provinces from "@/lib/provinces.json";
import { userSchema } from "@/lib/formSchemas";

const UserForm = () => {
  const [avatarImage, setAvatarImage] = useState<string | undefined>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    inputRef.current?.click();
  };

  const handleClearAvatar = () => {
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

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-2 gap-4">
        {/* AVATAR */}
        <Container className="flex flex-col justify-center items-center gap-12 bg-slate-100 rounded-xl h-full border">
          <Avatar className="size-56 text-5xl shadow-lg shadow-neutral-500">
            <AvatarImage src={avatarImage} />
            <AvatarFallback className="bg-neutral-300 border border-slate-300">
              <UserCircleIcon className="w-24 h-24 text-white" />
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

          {avatarImage ? (
            <Button type="button" onClick={handleClearAvatar}>
              Remove Photo
            </Button>
          ) : (
            <Button type="button" onClick={handleFileClick}>
              Upload Photo
            </Button>
          )}
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
                    <LabelInput id="email" label="Email" placeholder="Email" {...field} />
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
                    <LabelInput id="password" label="Password" type="password" placeholder="Password" {...field} />
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
                      <LabelInput id="firstName" placeholder="First Name" {...field} />
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
                      <LabelInput id="lastName" placeholder="Last Name" {...field} />
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
                        <SelectTrigger id="role" className="w-full">
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
                    <LabelInput id="permissions" label="Permissions (comma separated)" {...field} />
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
                    <LabelInput id="streetAddress" label="Street" {...field} />
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
                    <LabelInput id="city" label="City" {...field} />
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
                      <SelectTrigger className="w-full overflow-hidden">
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
                    <LabelInput id="postalCode" label="Postal Code" {...field} />
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
                    <LabelInput id="phoneNumber" label="Phone Number" {...field} />
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
    </Form>
  );
};

export default UserForm;
