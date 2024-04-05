import styled from "styled-components";

export const DashboardContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const DashboardTitle = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme["text-title"]};
  font-weight: 700;

  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export const ChartTitle = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme["text-title"]};
  font-weight: 600;

  display: flex;
  justify-content: center;
`;

export const DashboardContent = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const ChartContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AverageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
