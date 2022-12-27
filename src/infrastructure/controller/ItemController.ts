import { CrudOperation, Item, Uuid } from '@/spi'

export class ItemController implements CrudOperation<Item> {
	create(entity: Item): Promise<Item> {
		console.log()
		throw new Error('Method not implemented.')
	}

	findAll(): Promise<Array<Item>> {
		throw new Error('Method not implemented.')
	}

	findById(id: Uuid): Promise<Item> {
		throw new Error('Method not implemented.')
	}

	hardRemove(id: Uuid): Promise<Item> {
		throw new Error('Method not implemented.')
	}

	softRemove(id: Uuid): Promise<Item> {
		throw new Error('Method not implemented.')
	}

	update(entity: Item): Promise<Item> {
		throw new Error('Method not implemented.')
	}
}
