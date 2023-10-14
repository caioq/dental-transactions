import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme["white"]};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-height: 800px;
  overflow-y: auto;

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-background"]};
      color: ${(props) => props.theme["text-title"]};
      padding: 1rem;
      &::placeholder {
        color: ${(props) => props.theme["text-placeholder"]};
      }
    }
  }
`;

export const SecondaryButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["alt-primary"]};
  color: ${(props) => props.theme["blue-dark"]};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["blue-bright-700"]};
    color: ${(props) => props.theme["white"]};
    transition: background-color 0.2s;
  }
`;

export const PrimaryButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["blue-dark"]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  margin-top: 4rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["blue-bright-700"]};
    transition: background-color 0.2s;
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme["gray-500"]};
`;

// export const PaymentToReceiveCheckbox = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// export const PaymentToReceiveCheckboxButton = styled(Checkbox.Root)`
//   all: "unset";
//   background-color: white;
//   width: 25px;
//   height: 25px;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid ${(props) => props.theme["blue-dark"]};
//   /* box-shadow: 0 0 0 2px ${(props) => props.theme["blue-dark"]}; */

//   &:hover {
//     background-color: var(--violet-3);
//   }

//   :focus {
//     box-shadow: 0 0 0 2px black;
//     border: 1px solid ${(props) => props.theme["blue-bright"]};
//   }
// `;

// export const PaymentToReceiveCheckboxIndicator = styled(Checkbox.Indicator)`
//   color: ${(props) => props.theme["blue-bright"]};
// `;
