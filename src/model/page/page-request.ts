export class PageRequest {
    filter!: string
    currentPage!: number
    pageSize!: number

    sortField!: string
    direction!: string

    constructor() {
        this.filter = ''
        this.currentPage = 0
        this.pageSize = this.pageSize
        this.direction = 'asc'
    }

    public isSortable(): boolean {
        return this.sortField !== undefined && this.direction !== undefined
    }
}