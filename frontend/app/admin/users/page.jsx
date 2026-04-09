"use client";
import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { createUser, getUsers } from "@/lib/api";
import { Search, Filter, UserPlus, MoreHorizontal, Edit, Trash2, Mail, Users, GraduationCap, Shield, } from "lucide-react";
const roleConfig = {
    student: { icon: <GraduationCap className="h-3 w-3"/>, className: "bg-primary/20 text-primary" },
    teacher: { icon: <Users className="h-3 w-3"/>, className: "bg-accent/20 text-accent" },
    admin: { icon: <Shield className="h-3 w-3"/>, className: "bg-chart-3/20 text-chart-3" },
};
const statusConfig = {
    active: "bg-accent/20 text-accent",
    inactive: "bg-muted text-muted-foreground",
    pending: "bg-chart-3/20 text-chart-3",
};
export default function ManageUsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ total: 0, students: 0, teachers: 0, admins: 0 });
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "student" });
    const loadUsers = async () => {
        try {
            setError("");
            const data = await getUsers({
                q: searchQuery,
                role: roleFilter === "all" ? "" : roleFilter,
                status: statusFilter === "all" ? "" : statusFilter,
            });
            setUsers(data.users);
            setStats(data.stats);
        }
        catch (apiError) {
            setError(apiError.message || "Unable to load users");
        }
    };
    useEffect(() => {
        loadUsers();
    }, [searchQuery, roleFilter, statusFilter]);
    const statCards = useMemo(() => [
        { label: "Total Users", value: stats.total, icon: <Users className="h-5 w-5"/> },
        { label: "Students", value: stats.students, icon: <GraduationCap className="h-5 w-5"/> },
        { label: "Teachers", value: stats.teachers, icon: <Users className="h-5 w-5"/> },
        { label: "Admins", value: stats.admins, icon: <Shield className="h-5 w-5"/> },
    ], [stats]);
    const toggleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        }
        else {
            setSelectedUsers(users.map((u) => u.id));
        }
    };
    const toggleSelectUser = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter((u) => u !== id));
        }
        else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };
    const handleCreateUser = async () => {
        setIsSaving(true);
        try {
            await createUser(newUser);
            setAddUserDialogOpen(false);
            setNewUser({ name: "", email: "", role: "student" });
            await loadUsers();
        }
        catch (apiError) {
            setError(apiError.message || "Unable to create user");
        }
        finally {
            setIsSaving(false);
        }
    };
    return (<DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
            <p className="text-muted-foreground">
              View and manage all platform users
            </p>
          </div>
          <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4"/>
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account on the platform
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <Input placeholder="John Doe" className="bg-secondary border-border" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input type="email" placeholder="john@example.com" className="bg-secondary border-border" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Role</label>
                  <Select value={newUser.role} onValueChange={(role) => setNewUser({ ...newUser, role })}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select role"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser} disabled={isSaving || !newUser.name || !newUser.email}>
                  {isSaving ? "Creating..." : "Create User"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (<Card key={index} className="bg-card border-border">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="text-primary">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
            <Input placeholder="Search users..." className="pl-9 bg-secondary border-border" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32 bg-secondary border-border">
                <SelectValue placeholder="Role"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-secondary border-border">
                <SelectValue placeholder="Status"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="border-border">
              <Filter className="h-4 w-4"/>
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox checked={selectedUsers.length === users.length} onCheckedChange={toggleSelectAll}/>
                </TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Role</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Courses</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Last Active</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (<TableRow key={user.id} className="border-border hover:bg-secondary/50">
                  <TableCell>
                    <Checkbox checked={selectedUsers.includes(user.id)} onCheckedChange={() => toggleSelectUser(user.id)}/>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg"/>
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleConfig[user.role].className}>
                      {roleConfig[user.role].icon}
                      <span className="ml-1 capitalize">{user.role}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[user.status]}>
                      <span className="capitalize">{user.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-foreground">
                    {user.courses}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {new Date(user.lastActive).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4"/>
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4"/>
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4"/>
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>);
}
