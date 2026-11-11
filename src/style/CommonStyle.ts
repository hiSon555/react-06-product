import styled from "styled-components";
import { Link } from "react-router";

export const Message = styled.div`
    padding: 80px 0;
    text-align: center;
    color: #888;
`;

export const BackBtn = styled(Link)`
    width: 150px;
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.9rem;
    font-weight: 400;
    background-color: #2563eb;
    color: #fff;
    text-align: center;
    text-decoration: none;

    &:hover {
        background-color: #464e67;
        transform: translateY(-3px);
    }

    &:active {
        background-color: #1e40af;
    }
`;
