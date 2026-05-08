import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, type Column } from '../_shared/AdminTable'
import AdminModal, { Field, FieldGrid, TextInput, Textarea, Toggle } from '../_shared/AdminModal'
import { FilterSelect } from '../_shared/FilterSelect'
import { FolderTree, Plus } from 'lucide-react'
import type { CourseCategory } from '@/api/course-category/course-category.types'
import {
  useCreateCourseCategoryMutation,
  useDeleteCourseCategoryMutation,
  useGetCourseCategoriesPaginated,
  useUpdateCourseCategoryMutation,
} from '@/api/course-category/course-category.api'

const ACTIVE_FILTER_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const COLUMNS: Column<CourseCategory>[] = [
  {
    header: 'Name',
    render: (r) => (
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: 'var(--hm-violet-soft)', color: 'var(--hm-violet-2)' }}
        >
          <FolderTree className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="font-medium truncate text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
            {r.name}
          </p>
          <p className="hm-mono text-[10.5px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
            {r.id}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: 'Description',
    cellWrap: true,
    render: (r) => (
      <span className="text-[12px] leading-snug max-w-md inline-block" style={{ color: 'var(--hm-text-muted)' }}>
        {r.description || '—'}
      </span>
    ),
  },
  {
    header: 'Active',
    render: (r) =>
      r.isActive ? <Pill tone="success">Active</Pill> : <Pill tone="neutral">Inactive</Pill>,
  },
]

type ModalState = { mode: 'create' } | { mode: 'edit'; row: CourseCategory } | null

export default function CourseCategories() {
  const [page, setPage] = useState(1)
  const [searchDraft, setSearchDraft] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [modal, setModal] = useState<ModalState>(null)

  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formIsActive, setFormIsActive] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(searchDraft.trim()), 350)
    return () => window.clearTimeout(t)
  }, [searchDraft])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, activeFilter])

  const searchParam = debouncedSearch.length > 0 ? debouncedSearch : undefined
  const isActiveParam =
    activeFilter === '' ? undefined : activeFilter === 'active'

  const { data, isPending, isFetching, isError, isPlaceholderData } =
    useGetCourseCategoriesPaginated({
      page,
      search: searchParam,
      isActive: isActiveParam,
    })

  /** Full overlay during first load and when the query key changes (page, filters, search) while keeping prior rows. */
  const showTableLoader = isPending || (isFetching && isPlaceholderData)

  const createMutation = useCreateCourseCategoryMutation()
  const updateMutation = useUpdateCourseCategoryMutation()
  const deleteMutation = useDeleteCourseCategoryMutation()

  const submitBusy = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending

  const isOpen = modal !== null
  const editing = modal?.mode === 'edit' ? modal.row : null

  useEffect(() => {
    if (!isOpen) return
    if (modal?.mode === 'create') {
      setFormName('')
      setFormDescription('')
      setFormIsActive(true)
    } else if (modal?.mode === 'edit') {
      setFormName(modal.row.name)
      setFormDescription(modal.row.description ?? '')
      setFormIsActive(modal.row.isActive)
    }
  }, [isOpen, modal])

  const rows = data?.items ?? []

  const pagination = data
    ? {
        page: data.meta.currentPage,
        totalPages: Math.max(1, data.meta.totalPages),
        totalItems: data.meta.totalItems,
        itemCount: data.meta.itemCount,
        pageSize: data.meta.itemsPerPage,
        onPageChange: (p: number) => setPage(p),
      }
    : null

  const hasFilters = activeFilter !== ''

  async function handleSubmit() {
    const name = formName.trim()
    if (!name) {
      toast.error('Name is required.')
      return
    }
    const description = formDescription.trim()
    try {
      if (modal?.mode === 'create') {
        await createMutation.mutateAsync({
          name,
          description,
          isActive: formIsActive,
        })
        toast.success('Category created.')
      } else if (modal?.mode === 'edit') {
        await updateMutation.mutateAsync({
          categoryId: modal.row.id,
          payload: {
            name,
            description,
            isActive: formIsActive,
          },
        })
        toast.success('Category updated.')
      }
      setModal(null)
    } catch {
      /* error toast from mutation */
    }
  }

  async function handleDelete() {
    if (modal?.mode !== 'edit') return
    if (
      !window.confirm(
        `Delete category "${modal.row.name}"? This cannot be undone.`,
      )
    ) {
      return
    }
    try {
      await deleteMutation.mutateAsync(modal.row.id)
      toast.success('Category deleted.')
      setModal(null)
    } catch {
      /* error toast from mutation */
    }
  }

  return (
    <AdminShell activeId="course-categories">
      <AdminTable
        eyebrow="Catalog"
        title="Course categories"
        subtitle="Top-level taxonomy for organising the catalog."
        primaryAction={{
          label: 'New category',
          icon: Plus,
          onClick: () => setModal({ mode: 'create' }),
        }}
        searchPlaceholder="Search categories…"
        searchValue={searchDraft}
        onSearchChange={setSearchDraft}
        filterControls={
          <FilterSelect
            label="All statuses"
            value={activeFilter}
            options={ACTIVE_FILTER_OPTIONS}
            onChange={setActiveFilter}
          />
        }
        columns={COLUMNS}
        rows={rows}
        totalCount={data?.meta.totalItems}
        isLoading={showTableLoader}
        isFetching={isFetching && !showTableLoader}
        pagination={pagination}
        emptyMessage={
          isError
            ? 'Something went wrong loading categories.'
            : searchParam || hasFilters
              ? 'No categories match your filters.'
              : 'No categories yet. Create one to get started.'
        }
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={isOpen}
        onClose={() => !submitBusy && setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="category"
        entityName={editing?.name}
        subtitle={
          editing
            ? editing.description
              ? editing.description.slice(0, 80) + (editing.description.length > 80 ? '…' : '')
              : `ID: ${editing.id}`
            : 'Add a top-level taxonomy node.'
        }
        onSubmit={handleSubmit}
        submitBusy={submitBusy}
        destructive={
          editing
            ? { label: 'Delete category', onClick: handleDelete }
            : undefined
        }
      >
        <FieldGrid cols={2}>
          <Field label="Name" required span={2}>
            <TextInput
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Learning Science"
              autoComplete="off"
            />
          </Field>
          <Field
            label="Description"
            span={2}
            hint="A short blurb shown to learners browsing the catalog."
          >
            <Textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="What kinds of courses live here?"
              rows={4}
            />
          </Field>
          <Field label="Status" span={2}>
            <Toggle
              checked={formIsActive}
              onCheckedChange={setFormIsActive}
              label="Visible in catalog (active)"
            />
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
