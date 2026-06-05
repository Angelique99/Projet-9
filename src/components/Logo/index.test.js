import { render } from "@testing-library/react";
import Logo from "./index";

describe("Logo component", () => {
  test("renders logo without crash", () => {
    render(<Logo size="large" />);
  });
});