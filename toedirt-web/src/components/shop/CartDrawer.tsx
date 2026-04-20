"use client";

import { X, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { useState } from "react";

export function CartDrawer() {
  const { items, isOpen, setOpen, remove, total, clear } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const cartTotal = total();

  function checkout() {
    setConfirmed(true);
    clear();
  }

  return (
    <div
      aria-hidden={!isOpen}
      className={cn("fixed inset-0 z-50 transition", isOpen ? "pointer-events-auto" : "pointer-events-none")}
    >
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 bg-dirt-900/60 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone shadow-jobsite transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="caution-strip" aria-hidden />
        <div className="flex items-center justify-between border-b-2 border-dirt-200 px-5 py-4">
          <h2 className="font-display text-xl uppercase text-dirt-700">Your Toolbelt</h2>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setConfirmed(false);
            }}
            aria-label="Close cart"
            className="rounded-md border-2 border-dirt-700 p-2 text-dirt-700"
          >
            <X size={18} />
          </button>
        </div>

        {confirmed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <h3 className="font-display text-2xl uppercase text-hazard">Order Received</h3>
            <p className="text-sm text-dirt-600">
              Your request has been routed to Toe Dirt HQ. Bob is reviewing it with a clipboard and
              mild skepticism. You'll hear back after his shift.
            </p>
            <button
              type="button"
              onClick={() => {
                setConfirmed(false);
                setOpen(false);
              }}
              className="btn-outline"
            >
              Keep Browsing
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="font-marker text-xl text-dirt-500">Empty like a Monday lunch pail.</p>
            <p className="text-sm text-dirt-600">Add a package or some merch and come back.</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 border-b border-dirt-200 px-5 py-4"
                >
                  <div>
                    <p className="font-display uppercase text-dirt-700">{item.name}</p>
                    <p className="text-xs text-concrete">
                      {item.kind} · qty {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-dirt-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="text-concrete transition hover:text-rust"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t-2 border-dirt-200 p-5">
              <div className="flex items-center justify-between font-display text-lg uppercase text-dirt-700">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-concrete">
                Taxes, dirt, and Bob's handling fee calculated at imagination.
              </p>
              <button type="button" onClick={checkout} className="btn-hazard mt-4 w-full">
                Send It To Bob
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
