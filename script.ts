import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function create() {
	const user = await prisma.user.create({
		data: {
			id: 1,
			google_id: 'google_123',
			microsoft_id: 'microsoft_123',
			email: 'user@example.com',
			name: 'John Doe',
			has_mandate: true,
			is_admin: false,
			is_active: true,
			wiki_name: 'johndoe',
			authored_proposals: {
				create: [
					{
						title: 'Proposal Title 1',
						proposer_id: 1,
						implementer_id: 1,
						proposition_date: new Date(),
						agenda_date: new Date(),
						content: 'Proposal content 1',
						table: 'Table 1',
						proposed_resolution: 'Resolution 1',
						previous_proposals: 'Previous proposal 1',
						yes_votes: 10,
						no_votes: 2,
						abstention_votes: 1,
						invalid_votes: 0,
						is_accepted: true,
						is_urgent: false,
						is_electronic: true,
						is_double_majority: false,
						is_hidden: false,
						attachments: {
							create: [
								{
									file_path: '/path/to/file1',
									file_name: 'file1.pdf',
									is_hidden: false
								},
								{
									file_path: '/path/to/file2',
									file_name: 'file2.pdf',
									is_hidden: true
								}
							]
						}
					},
					{
						title: 'Proposal Title 2',
						proposer_id: 1,
						implementer_id: 1,
						proposition_date: new Date(),
						agenda_date: new Date(),
						content: 'Proposal content 2',
						table: 'Table 2',
						proposed_resolution: 'Resolution 2',
						previous_proposals: 'Previous proposal 2',
						yes_votes: 5,
						no_votes: 3,
						abstention_votes: 2,
						invalid_votes: 1,
						is_accepted: false,
						is_urgent: true,
						is_electronic: false,
						is_double_majority: true,
						is_hidden: true,
						attachments: {
							create: [
								{
									file_path: '/path/to/file3',
									file_name: 'file3.pdf',
									is_hidden: false
								}
							]
						}
					}
				]
			}
		}
	});
	console.log(user);
}

async function renewProposals() {
	const count = await prisma.proposal.deleteMany();
	console.log(`Removed ${count.count} entries.`);

	const proposals = await prisma.proposal.createMany({
		data: [...Array(30).keys()].map((i) => {
			const proposition_date = new Date(
				Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24)
			);
			const agenda_date = new Date(
				proposition_date.getTime() + Math.floor(Math.random() * 1000 * 60 * 60 * 24)
			);
			return {
				title: `Proposal Title ${i}`,
				author_id: 1,
				proposer_id: 1,
				implementer_id: 1,
				proposition_date,
				agenda_date,
				content: `Proposal content ${i}`,
				table: `Table ${i}`,
				proposed_resolution: `Resolution ${i}`,
				previous_proposals: `Previous proposal ${i}`,
				yes_votes: 0,
				no_votes: 0,
				abstention_votes: 0,
				invalid_votes: 0,
				is_accepted: false,
				is_urgent: true,
				is_electronic: false,
				is_double_majority: true,
				is_hidden: true
			};
		})
	});

	console.log(proposals);
}

async function getOne(id: number) {
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	});
	console.log(user);
}

async function getAll() {
	const users = await prisma.user.findMany();
	console.log(users);
}

async function getAttachmentsForProposalsImplementedByUser(id: number) {
	const user = await prisma.user.findUnique({
		where: {
			id
		},
		include: {
			implemented_proposals: {
				include: {
					attachments: true
				}
			}
		}
	});
	console.log(user.implemented_proposals.map((ip) => ip.attachments).flat());
}

// create()
renewProposals()
	// getOne(1)
	// getAll()
	// getAttachmentsForProposalsImplementedByUser(1)
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
