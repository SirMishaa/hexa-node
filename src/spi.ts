export type Uuid = string

export interface BaseEntity {
	id: Uuid
	createdAt: Date
	updatedAt: Date
	removedAt: Date | null
}

export interface Item extends BaseEntity {
	name: string
	description: string
	price: number
	availableQuantity: number
	seller: Seller
}

export interface Seller {
	name: string
	description: string
	logoPictureUrl: string
	contactEmail: string
	soldItems: Array<Item>
}

export interface CrudOperation<Type extends BaseEntity> {
	findById(id: Uuid): Promise<Type>
	findAll(): Promise<Array<Type>>
	create(entity: Type): Promise<Type>
	update(entity: Type): Promise<Type>
	softRemove(id: Uuid): Promise<Type>
	hardRemove(id: Uuid): Promise<Type>
}

export interface ItemRepository extends CrudOperation<Item> {
	findBySellerId(sellerId: Uuid): Promise<Array<Item>>
	findByName(name: string): Promise<Array<Item>>
}
