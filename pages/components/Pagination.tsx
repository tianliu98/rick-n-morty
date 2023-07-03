import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getPaginationRange = (currentPage: number, totalPage: number) => {
    const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

    const halfWay = Math.ceil(5 / 2);

    if (currentPage <= halfWay) {
        return pageNumbers.slice(0, 5);
    } else if (currentPage > totalPage - halfWay) {
        return pageNumbers.slice(totalPage - 5);
    } else {
        return pageNumbers.slice(
            currentPage - halfWay,
            currentPage + halfWay - 1
        );
    }
};

interface PaginiationProps {
    currentPage: number;
    pages: number;
    prev: string;
    next: string;
}

const Paginiation: React.FC<PaginiationProps> = ({
    currentPage,
    pages,
    prev,
    next,
}) => {
    const router = useRouter();

    const [paginationNumbers, setPaginationNumbers] = useState<number[]>([]);

    useEffect(() => {
        setPaginationNumbers(getPaginationRange(currentPage, pages));
    }, [currentPage, pages]);

    return (
        <div className="pagination">
            <button
                disabled={prev ? false : true}
                onClick={() => {
                    router.push(`/chars/${currentPage - 1}`);
                }}
            >
                Prev
            </button>
            {paginationNumbers.map((num, index) => (
                <button
                    key={index}
                    onClick={() => {
                        router.push(`/chars/${num}`);
                    }}
                    disabled={num === currentPage ? true : false}
                >
                    {num}
                </button>
            ))}
            <button
                disabled={next ? false : true}
                onClick={() => {
                    router.push(`/chars/${currentPage + 1}`);
                }}
            >
                Next
            </button>
        </div>
    );
};

export default Paginiation;
