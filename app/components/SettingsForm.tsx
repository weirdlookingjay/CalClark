"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

interface iAppProps {
    fullName: string;
    email: string;
    profileImage: string;
}

export function SettingsForm({ email, fullName, profileImage }: iAppProps) {
    const [lastResult, action] = useFormState(SettingsAction, undefined);
    const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: settingsSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    const handleDeleteImage = () => {
        setCurrentProfileImage("");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings </CardTitle>
                <CardDescription>Manage your acciunt settings!</CardDescription>
            </CardHeader>

            <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                <CardContent className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <Label>Full Name</Label>
                        <Input
                            name={fields.fullName.name}
                            key={fields.fullName.key}
                            defaultValue={fullName}
                            placeholder="Jane Doe"
                        />
                        <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Email</Label>
                        <Input
                            defaultValue={email}
                            placeholder="jdoe@example.com"
                            disabled
                        />
                    </div>
                    <div className="grid gap-y-5">
                        <Label>Profile Image</Label>
                        <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage} />
                        {currentProfileImage ? (
                            <div className="relative size-16">
                                <Image
                                    src={currentProfileImage}
                                    alt="Profile Image"
                                    className="rounded-lg"
                                    width={64}
                                    height={64}
                                />
                                <Button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-3 -right-3"
                                >
                                    <X className="size-4" />
                                </Button>
                            </div>
                        ) : (
                            <UploadDropzone onClientUploadComplete={(res) => {
                                setCurrentProfileImage(res[0].url);
                                toast.success("Profile image has been uploaded");
                            }} onUploadError={(error) => {
                                console.log("Something went wrong", error);
                                toast.error(error.message);
                            }} endpoint="imageUploader" />
                        )}
                        <p className="text-red-500 text-sm">{fields.profileImage.error}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Save Changes" />
                </CardFooter>
            </form>
        </Card>
    );
}
