import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const CheckoutForm = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    // TanStack Query for user data
    const {
        data: userData,
        isLoading: isUserLoading,
        isError,
        error: userFetchError,
        refetch: refetchUser,
    } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const role = userData?.role;

    useEffect(() => {
        axiosSecure
            .post('/create-payment-intent', { amountCent: 500 })
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(() => {
                setError('Failed to create payment intent.');
            });
    }, [axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (pmError) {
            setError(pmError.message);
            return;
        }

        setError('');

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setSuccess(true);
            Swal.fire({
                title: 'Payment Successful!',
                text: 'You are now a Gold Member.',
                icon: 'success',
                confirmButtonText: 'Cool',
            });

            await axiosSecure.patch(`/users/${user.email}`, {
                role: 'member',
                badge: 'gold',
            });

            await axiosSecure.post('/members', {
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                joinedAt: new Date(),
            });

            // Refetch updated user info
            refetchUser();
        }
    };

    useEffect(() => {
        if (role === 'member') {
            setSuccess(true);
        }
    }, [role]);

    if (isUserLoading) return <p className="text-center mt-6">Loading user info...</p>;
    if (isError) return <p className="text-red-500 text-center mt-6">{userFetchError.message}</p>;

    return (
        <div data-aos="fade-up" className="max-w-md mx-auto p-6 bg-base-100 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-center text-info">Become a Member</h2>
            <p className="mb-4 text-center">Pay $5 to get Gold Badge and unlimited posts!</p>

            <form onSubmit={handleSubmit} className="p-6 bg-base-100 shadow rounded">
                <h2 className="text-xl font-bold mb-4 text-center">Become a Gold Member</h2>
                <CardElement className="p-2 border rounded" />

                {role === 'member' ? (
                    <button className="btn btn-success w-full mt-4" disabled>
                        You are already a Gold Member
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                        disabled={!stripe || !clientSecret || !elements || success}
                    >
                        Pay $5
                    </button>
                )}

                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-600 mt-2">You're now a Gold Member!</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
