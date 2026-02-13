import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import TopBar from "@/components/TopBar";
import { Plus, Pencil, Trash2, CalendarDays, UtensilsCrossed, LogOut, Check, X, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface MenuItemRow {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  is_popular: boolean | null;
  is_available: boolean | null;
  image_key: string | null;
  sort_order: number | null;
}

interface BookingRow {
  id: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string | null;
  booking_date: string;
  booking_time: string;
  party_size: number;
  special_requests: string | null;
  status: string;
  created_at: string;
}

const categories = [
  "Tawa Special", "Boneless Handi", "Karahi", "Tandoor", "Mutton Section",
  "Appetizers", "BBQ", "Rice", "Signature Platters", "Signature Dishes",
  "Desserts", "Sides", "Special Offerings",
];

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"menu" | "bookings">("menu");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItemRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: categories[0], description: "", price: "", is_popular: false, image_key: "" });

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      if (tab === "menu") fetchMenu();
      else fetchBookings();
    }
  }, [isAdmin, tab]);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/auth"); return; }
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
    if (!data || data.length === 0) {
      setIsAdmin(false);
      toast.error("You don't have admin access");
      return;
    }
    setIsAdmin(true);
  };

  const fetchMenu = async () => {
    const { data } = await supabase.from("menu_items").select("*").order("category").order("sort_order");
    if (data) setMenuItems(data as MenuItemRow[]);
  };

  const fetchBookings = async () => {
    const { data } = await supabase.from("bookings").select("*").order("booking_date", { ascending: false });
    if (data) setBookings(data as BookingRow[]);
  };

  const handleSaveItem = async () => {
    if (!form.name || !form.price) { toast.error("Name and price are required"); return; }
    const payload = {
      name: form.name,
      category: form.category,
      description: form.description || null,
      price: parseInt(form.price),
      is_popular: form.is_popular,
      image_key: form.image_key || null,
    };

    if (editingItem) {
      const { error } = await supabase.from("menu_items").update(payload).eq("id", editingItem.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Item updated");
    } else {
      const { error } = await supabase.from("menu_items").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Item added");
    }
    resetForm();
    fetchMenu();
  };

  const handleDeleteItem = async (id: string) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Item deleted");
    fetchMenu();
  };

  const handleBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(`Booking ${status}`);
    fetchBookings();
  };

  const resetForm = () => {
    setForm({ name: "", category: categories[0], description: "", price: "", is_popular: false, image_key: "" });
    setEditingItem(null);
    setShowForm(false);
  };

  const startEdit = (item: MenuItemRow) => {
    setForm({
      name: item.name,
      category: item.category,
      description: item.description || "",
      price: item.price.toString(),
      is_popular: item.is_popular ?? false,
      image_key: item.image_key || "",
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm animate-pulse">Checking access...</div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-background pt-16 flex flex-col items-center justify-center px-5 text-center">
        <TopBar />
        <X size={48} className="text-destructive mb-4" />
        <h2 className="font-display text-xl font-bold text-foreground mb-2">Access Denied</h2>
        <p className="text-sm text-muted-foreground mb-6">You need admin privileges to access this panel.</p>
        <button onClick={() => navigate("/")} className="px-6 py-3 rounded-xl bg-gold-gradient text-primary-foreground font-semibold text-sm">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-6">
      <TopBar />

      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gold-gradient">Admin Panel</h1>
          <p className="text-[10px] text-muted-foreground">Manage menu & bookings</p>
        </div>
        <button onClick={handleLogout} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive">
          <LogOut size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-5 flex gap-2 mb-4">
        <button onClick={() => setTab("menu")} className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${tab === "menu" ? "bg-gold-gradient text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
          <UtensilsCrossed size={14} /> Menu
        </button>
        <button onClick={() => setTab("bookings")} className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${tab === "bookings" ? "bg-gold-gradient text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
          <CalendarDays size={14} /> Bookings
        </button>
      </div>

      {/* Menu Tab */}
      {tab === "menu" && (
        <div className="px-5 space-y-3">
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="w-full py-3 rounded-xl border border-dashed border-primary/30 text-primary text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-primary/5 transition-colors">
              <Plus size={14} /> Add Menu Item
            </button>
          )}

          {showForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4 space-y-3">
              <h3 className="font-display text-sm font-bold text-foreground">{editingItem ? "Edit Item" : "New Item"}</h3>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dish name" className="w-full bg-secondary rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary" maxLength={100} />
              <div className="relative">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-secondary rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary appearance-none">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full bg-secondary rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary" maxLength={200} />
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (PKR)" className="w-full bg-secondary rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary" />
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" checked={form.is_popular} onChange={(e) => setForm({ ...form, is_popular: e.target.checked })} className="rounded" />
                Mark as Popular
              </label>
              <div className="flex gap-2">
                <button onClick={handleSaveItem} className="flex-1 py-2.5 rounded-xl bg-gold-gradient text-primary-foreground text-xs font-bold flex items-center justify-center gap-1">
                  <Check size={14} /> {editingItem ? "Update" : "Add"}
                </button>
                <button onClick={resetForm} className="px-4 py-2.5 rounded-xl bg-secondary text-muted-foreground text-xs font-medium">Cancel</button>
              </div>
            </motion.div>
          )}

          {menuItems.length === 0 ? (
            <p className="text-center text-xs text-muted-foreground py-8">No menu items yet. Add your first dish!</p>
          ) : (
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.id} className="glass-card rounded-xl p-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                      {item.is_popular && <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[8px] font-bold">Popular</span>}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{item.category} • PKR {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button onClick={() => startEdit(item)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bookings Tab */}
      {tab === "bookings" && (
        <div className="px-5 space-y-2">
          {bookings.length === 0 ? (
            <p className="text-center text-xs text-muted-foreground py-8">No bookings yet.</p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="glass-card rounded-xl p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{b.guest_name}</p>
                    <p className="text-[10px] text-muted-foreground">{b.guest_phone}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    b.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                    b.status === "cancelled" ? "bg-destructive/20 text-destructive" :
                    "bg-primary/20 text-primary"
                  }`}>
                    {b.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{b.booking_date}</span>
                  <span>{b.booking_time}</span>
                  <span>{b.party_size} guests</span>
                </div>
                {b.special_requests && <p className="text-[10px] text-muted-foreground italic">"{b.special_requests}"</p>}
                {b.status === "pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => handleBookingStatus(b.id, "confirmed")} className="flex-1 py-2 rounded-lg bg-green-500/20 text-green-400 text-[10px] font-bold flex items-center justify-center gap-1">
                      <Check size={12} /> Confirm
                    </button>
                    <button onClick={() => handleBookingStatus(b.id, "cancelled")} className="flex-1 py-2 rounded-lg bg-destructive/20 text-destructive text-[10px] font-bold flex items-center justify-center gap-1">
                      <X size={12} /> Cancel
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;