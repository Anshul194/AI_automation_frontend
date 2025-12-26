import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { completeMetaIntegration, MetaAdAccount } from '../../store/slices/connection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SelectMetaAccountPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    // We can use local loading/error state since connection slice doesn't have specific meta loading state easily accessible 
    // without interfering with other general loading states if we shared them. 
    // However, connection slice has `loading` and `error` we can use.
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.connection);

    const [accounts, setAccounts] = useState<MetaAdAccount[]>([]);
    const [parseError, setParseError] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const accountsParam = searchParams.get('accounts');
        const tokenParam = searchParams.get('accessToken') || searchParams.get('token');

        // Some OAuth redirects return the access token in the URL fragment (hash), e.g. #access_token=...
        let fragmentToken: string | null = null;
        try {
            if (typeof window !== 'undefined' && window.location && window.location.hash) {
                const hash = window.location.hash.replace(/^#/, '');
                if (hash) {
                    const hashParams = new URLSearchParams(hash);
                    fragmentToken = hashParams.get('access_token') || hashParams.get('accessToken') || hashParams.get('token');
                }
            }
        } catch (e) {
            console.warn('Failed to parse URL fragment for token', e);
        }

        const finalTokenParam = tokenParam ?? fragmentToken;

        if (finalTokenParam) {
            try {
                const decodedToken = decodeURIComponent(finalTokenParam);
                setAccessToken(decodedToken);
                try {
                    localStorage.setItem('metaAccessToken', decodedToken);
                } catch (e) {
                    console.warn('Failed to save meta access token to localStorage', e);
                }
            } catch (err) {
                console.warn('Failed to decode access token param', err);
            }
        }

        if (accountsParam) {
            try {
                const parsedAccounts = JSON.parse(decodeURIComponent(accountsParam));
                setAccounts(parsedAccounts);
            } catch (err) {
                console.error('Failed to parse accounts:', err);
                setParseError('Failed to load ad accounts. Please try connecting again.');
            }
        } else {
            // If no accounts param, check if we have any other error param
            const errorParam = searchParams.get('error');
            if (errorParam) {
                setParseError(decodeURIComponent(errorParam));
            } else {
                setParseError('No accounts data received from Meta. Please try connecting again.');
            }
        }
    }, [searchParams]);

    const handleSelectAccount = async (account: MetaAdAccount) => {
        const userStr = localStorage.getItem("user");
        const userId = userStr ? JSON.parse(userStr)._id : null;

        if (!userId) {
            setParseError("User ID not found. Please log in again.");
            return;
        }

        try {
            const tokenToUse = accessToken ?? localStorage.getItem('metaAccessToken') ?? undefined;

            await completeMetaIntegration(userId, account.accountId, tokenToUse as string | undefined);

            // Success! Redirect to app integrations/dashboard
            navigate('/app/integrations');
        } catch (err: any) {
            console.error('Failed to complete integration:', err);
            setParseError(typeof err === 'string' ? err : 'Failed to save integration.');
        }
    };

    if (parseError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-dark-bg p-4">
                <Card className="w-full max-w-md dark-card border-none">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-dark-negative">
                            <AlertCircle className="h-6 w-6" />
                            <CardTitle className="text-dark-primary">Error</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-dark-secondary mb-4">{parseError}</p>
                        <Button onClick={() => navigate('/connect')} variant="outline" className="w-full dark-button-secondary">
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-dark-bg p-4">
            <Card className="w-full max-w-2xl dark-card border-none shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-dark-primary">Select Ad Account</CardTitle>
                    <CardDescription className="text-lg text-dark-secondary">
                        Choose the Meta Ads account you want to connect to AI8 Digital.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin text-dark-cta mb-4" />
                            <p className="text-dark-secondary">Connecting your account...</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {accounts.length === 0 ? (
                                <div className="text-center py-8 text-dark-secondary">
                                    No ad accounts found.
                                </div>
                            ) : (
                                accounts.map((account) => (
                                    <div
                                        key={account.id}
                                        className="group flex items-center justify-between p-4 rounded-xl border border-dark-border bg-dark-hover hover:border-dark-cta hover:bg-dark-card transition-all cursor-pointer"
                                        onClick={() => handleSelectAccount(account)}
                                    >
                                        <div>
                                            <h3 className="font-semibold text-dark-primary group-hover:text-dark-cta">
                                                {account.name}
                                            </h3>
                                            <p className="text-sm text-dark-secondary group-hover:text-dark-cta/80">
                                                ID: {account.accountId}
                                            </p>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <CheckCircle2 className="h-6 w-6 text-dark-cta" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-dark-border flex justify-center">
                        <Button variant="ghost" onClick={() => navigate('/connect')} className="text-dark-secondary hover:text-dark-primary hover:bg-dark-hover">
                            Cancel Connection
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}



