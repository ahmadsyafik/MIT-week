import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full rounded-3xl bg-white border border-[#9DB2BF]/40 p-8 shadow-xl space-y-5 text-[#27374D]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#27374D]">Terjadi Kendala Tampilan</h2>
              <p className="text-xs sm:text-sm text-[#526D82] leading-relaxed">
                Halaman ini mengalami gangguan saat dimuat. Seluruh data lokal dan progres Anda tetap aman.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#526D82] px-5 py-2 text-xs font-bold text-white hover:bg-[#27374D] active:scale-98 transition-all shadow-sm w-full sm:w-auto cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Muat Ulang Halaman</span>
              </button>

              <Link to="/" className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => this.setState({ hasError: false, error: null })}
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#9DB2BF] bg-[#DDE6ED]/60 px-5 py-2 text-xs font-bold text-[#27374D] hover:bg-[#DDE6ED] transition-colors w-full sm:w-auto cursor-pointer"
                >
                  <Home className="h-3.5 w-3.5" />
                  <span>Ke Beranda</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

