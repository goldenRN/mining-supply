

"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X, Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function CheckoutContactModal({
    open,
    onClose,
    cart,
    clearCart
}: {
    open: boolean;
    onClose: () => void;
    cart: any[];
    clearCart: () => void;
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState<{ [k: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    // зөвхөн цифр + урт хязгаар
    const onlyDigitsAndLimit = (val: string, limit = 8) =>
        val.replace(/\D/g, "").slice(0, limit);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError("");

        const nextErrors: { [k: string]: string } = {};

        if (phone1.trim().length !== 8) {
            nextErrors.phone1 = "Утас 1 нь яг 8 оронтой байх ёстой.";
        }

        if (phone2.trim().length > 0 && phone2.trim().length !== 8) {
            nextErrors.phone2 = "Утас 2 өгвөл яг 8 оронтой байх ёстой.";
        }

        if (email.trim().length > 0) {
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRe.test(email.trim())) {
                nextErrors.email = "Хэрэв имэйл оруулсан бол зөв форматтай байх ёстой.";
            }
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) return;

        // --- API рүү илгээх payload ---
        const payload = {
            name,
            email,
            phone1,
            phone2,
            message,
            cart: cart.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                qty: item.quantity,
            })),
        };

        console.log("Submitting order:", payload);

        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "Серверийн алдаа гарлаа");
            }

            // Амжилттай
            alert("Таны захиалга амжилттай бүртгэгдлээ! Захиалга №: " + data.order_id);

            clearCart();
            onClose();

            // Формыг цэвэрлэх
            setName("");
            setEmail("");
            setPhone1("");
            setPhone2("");
            setMessage("");
        } catch (err: any) {
            console.error("ORDER ERROR:", err);
            setApiError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 lg:p-8 relative">

                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
                            Худалдан авагчийн мэдээлэл
                        </h2>

                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* LEFT INFO */}
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Манай борлуулалтын мэргэжилтэн тантай богино хугацаанд холбогдох болно.
                            </p>

                            <div className="flex items-center gap-3 py-2">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="text-sm text-gray-500 whitespace-nowrap">эсвэл</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            <p className="text-sm text-gray-600">
                                Та шууд борлуулалтын мэргэжилтэнтэй холбогдож болно.
                            </p>

                            <h2 className="text-lg font-semibold text-gray-800 pt-6">
                                Бидэнтэй холбогдох
                            </h2>

                            <div className="mt-3 space-y-3 text-gray-700">
                                <p className="text-sm font-medium">Mining Supplers ХХК</p>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center">
                                        <Phone size={14} className="text-white" />
                                    </div>
                                    <div className="text-sm leading-tight">
                                        <div>+976 60303468</div>
                                        <div>+976 99887766</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center">
                                        <Mail size={14} className="text-white" />
                                    </div>
                                    <div className="text-sm leading-tight">
                                        <div>ankhtubayar@urnukhbarilga.com</div>
                                        <div>sales@urnukhbarilga.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT FORM */}
                        <div>
                            <form className="space-y-4" onSubmit={handleSubmit} noValidate>

                                {/* API error */}
                                {apiError && (
                                    <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                                        {apiError}
                                    </p>
                                )}

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Нэр</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        placeholder="Жишээ: Бат-Эрдэнэ"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Имэйл</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        placeholder="example@mail.com"
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>

                                {/* Phone 1 */}
                                <div>
                                    <label className="flex items-center justify-between text-sm font-medium mb-1">
                                        <span>Утас 1</span>
                                        <span className="text-xs bg-blue-900 text-white rounded px-2 py-0.5">
                                            Заавал
                                        </span>
                                    </label>

                                    <input
                                        inputMode="numeric"
                                        maxLength={8}
                                        value={phone1}
                                        onChange={(e) => setPhone1(onlyDigitsAndLimit(e.target.value))}
                                        className={`w-full border ${
                                            errors.phone1 ? "border-red-400" : "border-gray-300"
                                        } rounded-md px-3 py-2 text-sm`}
                                        placeholder="8 оронтой утас"
                                    />
                                    {errors.phone1 && <p className="text-xs text-red-500">{errors.phone1}</p>}
                                </div>

                                {/* Phone 2 */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Утас 2</label>
                                    <input
                                        inputMode="numeric"
                                        maxLength={8}
                                        value={phone2}
                                        onChange={(e) => setPhone2(onlyDigitsAndLimit(e.target.value))}
                                        className={`w-full border ${
                                            errors.phone2 ? "border-red-400" : "border-gray-300"
                                        } rounded-md px-3 py-2 text-sm`}
                                        placeholder="8 оронтой утас"
                                    />
                                    {errors.phone2 && <p className="text-xs text-red-500">{errors.phone2}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Мессэж</label>
                                    <textarea
                                        rows={3}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        placeholder="Таны захиалгын дэлгэрэнгүй..."
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-blue-800 transition"
                                >
                                    {loading ? "Илгээж байна..." : "Захиалга илгээх"}
                                </button>
                            </form>
                        </div>

                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

