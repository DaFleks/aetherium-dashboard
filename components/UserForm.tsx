"use client";

import Container from "./aetherium/Container";
import LabelInput from "./aetherium/LabelInput";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "./ui/label";
import provinces from "@/lib/provinces.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { CameraIcon } from "lucide-react";
import { userSchema } from "@/lib/formSchemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserForm = () => {
  const [avatarImage, setAvatarImage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    inputRef.current?.click();
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
        <Container className="flex flex-col justify-center items-center gap-12">
          <Avatar className="size-56 text-5xl shadow-lg shadow-slate-500">
            <AvatarImage src={avatarImage} />
            <AvatarFallback />

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
          <Container className="grid grid-cols-2 gap-4">
            <Button type="button" onClick={handleFileClick}>
              Upload
            </Button>
            <Button type="button">Clear</Button>
          </Container>
        </Container>

        <Container className="space-y-4">
          <Container className="grid grid-cols-2 gap-4">
            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LabelInput id="email" label="Email" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <LabelInput id="password" label="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MODERATOR">Moderator</SelectItem>
                        <SelectItem value="GUEST">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Container className="space-y-2 col-span-3">
              {/* PROVINCE */}
              <Label htmlFor="role">Province</Label>
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Container>

            {/* POSTAL CODE */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LabelInput id="postalCode" label="Postal Code" {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </Container>

          <Button type="submit" className="w-1/2 mx-auto flex py-6 mt-6">
            Submit
          </Button>
        </Container>
      </form>
    </Form>
  );
};

export default UserForm;
