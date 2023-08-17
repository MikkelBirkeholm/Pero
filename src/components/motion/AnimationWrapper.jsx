"use client";
import { AnimatePresence, motion } from "framer-motion";

import React from "react";

export const AnimationWrapper = ({ children }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};
