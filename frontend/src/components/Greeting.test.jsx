import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Greeting from "./Greeting";

test("renders content", () => {
  const user = {
    username: "tazim",
  };

  render(<Greeting user={user} />);

  const element = screen.getByText("tazim");
  expect(element).toBeDefined();
});
