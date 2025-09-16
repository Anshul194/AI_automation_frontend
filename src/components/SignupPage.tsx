import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { signupUser, login, sendOtp, verifyOtp } from "../store/slices/authSlice";
import { useAppSelector } from "../store/hooks";
import OTPModal from "./OTPModal";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const role = "68c7b2e1983d3d7cccc36a9a";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    setOtpError(null);
    try {
      await sendOtp(email);
      setOtpDialogOpen(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    setOtpLoading(true);
    setOtpError(null);
    try {
      await verifyOtp(email, otp);
      // Now call signup API with is_verify true and static role and phone
      const data = await signupUser(email, password, fullName, role, true, phone);
      // Save tokens and user to localStorage
      if (data && data?.data?.accessToken && data?.data?.refreshToken && data?.data?.user) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }
      dispatch(login({ user: data.data.user, token: data.data.accessToken }));
      setOtpDialogOpen(false);
      navigate("/");
    } catch (err: any) {
      setOtpError(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto"></div>
          <h1 className="text-3xl font-bold text-dark-primary">Create Account</h1>
          <p className="text-dark-secondary">Sign up to access your D2C analytics dashboard</p>
        </div>
        <Card className="dark-card p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-dark-primary">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                className="bg-dark-hover border-dark-border text-dark-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-dark-primary">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                className="bg-dark-hover border-dark-border text-dark-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-dark-primary">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="bg-dark-hover border-dark-border text-dark-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-dark-primary">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="bg-dark-hover border-dark-border text-dark-primary"
              />
            </div>
            {/* Optionally add role selection here */}
            <Button
              onClick={handleSignup}
              className="w-full dark-button-primary"
              size="lg"
              disabled={loading || !email || !password || !fullName}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign Up
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {error && (
              <div className="text-red-500 text-sm text-center mt-2">{error}</div>
            )}
      {/* OTP Modal */}
      <OTPModal
        open={otpDialogOpen}
        onClose={() => setOtpDialogOpen(false)}
        onSubmit={handleOtpSubmit}
        loading={otpLoading}
        error={otpError}
        email={email}
      />
          </div>
          <div className="text-center text-sm">
            <span className="text-dark-secondary">Already have an account? </span>
            <button className="text-dark-cta hover:underline" onClick={() => navigate("/login")}>Sign in</button>
          </div>
        </Card>
      </div>
    </div>
  );
}
