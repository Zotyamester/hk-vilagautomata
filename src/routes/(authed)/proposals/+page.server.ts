import prisma from "$lib/prisma";

export async function load() {
    const proposals = await prisma.proposal.findMany({
        include: {
            author: true,
            implementer: true,
            proposer: true,
            attachments: true,
        }
    });
    return {
        proposals
    };
}
