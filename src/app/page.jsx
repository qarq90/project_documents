"use client";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { BodyWrapper } from "@/components/Wrapper";

export default function home() {
    return (
        <BodyWrapper>
            <Hero />
            <Features />
        </BodyWrapper>
    );
}
