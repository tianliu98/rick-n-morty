import Character from "../components/Character";
import Paginiation from "../components/Pagination";
import { useRouter } from "next/router";
import type { GetStaticProps, GetStaticPaths } from "next";

interface CharacterData {
    id: number;
    name: string;
    image: string;
}

interface PageProps {
    data: {
        results: CharacterData[];
        info: {
            pages: number;
            prev: string;
            next: string;
        };
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    page: "1",
                },
            },
        ],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<{ data: PageProps }> = async ({
    params,
}) => {
    const page = params?.page;
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    const data = await res.json();

    return { props: { data } };
};

const Page: React.FC<PageProps> = ({ data }) => {
    const router = useRouter();
    return (
        <div className="character-feed-wrapper">
            <h1>Rick and Morty Characters</h1>

            <div className="characters-container">
                {data?.results.map((character) => (
                    <Character key={character.id} character={character} />
                ))}
                Sus
            </div>

            <Paginiation
                currentPage={Number(router.query.page)}
                pages={data?.info.pages}
                prev={data?.info.prev}
                next={data?.info.next}
            />
        </div>
    );
};

export default Page;
